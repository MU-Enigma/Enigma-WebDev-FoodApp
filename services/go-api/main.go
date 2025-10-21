package main

import (
	"context"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/trace"
)

var tracer trace.Tracer

func main() {
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr, TimeFormat: time.RFC3339})
	logger := log.With().Str("service", "food-go-api").Logger()
	logger.Info().Msg("starting service")

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer cancel()

	dbURL := getenv("DATABASE_URL", "postgres://foodapp:foodapp_pass@localhost:5432/fooddb?sslmode=disable")
	pool, err := pgxpool.New(ctx, dbURL)
	if err != nil {
		logger.Fatal().Err(err).Msg("failed to create db pool")
	}
	defer pool.Close()

	rdb := redis.NewClient(&redis.Options{
		Addr:     getenv("REDIS_ADDR", "localhost:6379"),
		Password: "",
		DB:       0,
	})
	defer rdb.Close()

	tracer = otel.Tracer("food-go-api")

	mux := http.NewServeMux()
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
		w.Write([]byte("ok"))
	})
	mux.HandleFunc("/meals", makeMealsHandler(pool, rdb))
	mux.HandleFunc("/orders", makeOrdersHandler())
	mux.Handle("/metrics", promhttp.Handler())

	server := &http.Server{
		Addr:         ":8080",
		Handler:      corsMiddleware(loggingMiddleware(mux, logger)),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	ln, err := net.Listen("tcp", server.Addr)
	if err != nil {
		logger.Fatal().Err(err).Msg("failed to listen")
	}

	go func() {
		if err := server.Serve(ln); err != nil && err != http.ErrServerClosed {
			logger.Fatal().Err(err).Msg("server error")
		}
	}()

	logger.Info().Msgf("listening on %s", server.Addr)

	<-ctx.Done()
	logger.Info().Msg("shutting down")

	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer shutdownCancel()
	if err := server.Shutdown(shutdownCtx); err != nil {
		logger.Error().Err(err).Msg("shutdown error")
	}
}

func getenv(k, d string) string {
	v := os.Getenv(k)
	if v == "" {
		return d
	}
	return v
}
