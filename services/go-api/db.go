package main

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/zerolog/log"
)

// meals cache key
const mealsKey = "meals:all"

func makeMealsHandler(pool *pgxpool.Pool, rdb *redis.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
		defer cancel()

		// Try Redis hot-read
		if rdb != nil {
			if data, err := rdb.Get(ctx, mealsKey).Result(); err == nil && data != "" {
				w.Header().Set("Content-Type", "application/json")
				w.Write([]byte(data))
				return
			}
		}

		// Fallback to Postgres
		rows, err := pool.Query(ctx, "SELECT id, name, price::double precision AS price, description, image FROM meals ORDER BY id")
		if err != nil {
			log.Error().Err(err).Msg("db query failed")
			http.Error(w, "internal error", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var meals []map[string]interface{}
		for rows.Next() {
			var id int
			var name, desc, image string
			var price float64
			if err := rows.Scan(&id, &name, &price, &desc, &image); err != nil {
				log.Error().Err(err).Msg("row scan failed")
				http.Error(w, "internal error", http.StatusInternalServerError)
				return
			}
			meals = append(meals, map[string]interface{}{
				"id":          id,
				"name":        name,
				"price":       price,
				"description": desc,
				"image":       image,
			})
		}

		b, _ := json.Marshal(meals)

		// Cache in Redis (best-effort, async)
		if rdb != nil {
			_ = rdb.Set(ctx, mealsKey, string(b), 60*time.Second).Err()
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(b)
	}
}
