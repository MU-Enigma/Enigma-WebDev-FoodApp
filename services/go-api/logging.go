package main

import (
	"net/http"
	"time"

	"github.com/rs/zerolog"
)

func loggingMiddleware(next http.Handler, logger zerolog.Logger) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		logger.Info().Str("method", r.Method).Str("path", r.URL.Path).Msg("request start")
		next.ServeHTTP(w, r)
		logger.Info().Str("method", r.Method).Str("path", r.URL.Path).
			Int64("duration_ms", time.Since(start).Milliseconds()).Msg("request end")
	})
}
