package main

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/rs/zerolog/log"
)

type OrderItem struct {
	ID       interface{} `json:"id"`
	Name     string      `json:"name"`
	Price    json.Number `json:"price"`
	Quantity int         `json:"quantity"`
}

type OrderRequest struct {
	Order struct {
		Items    []OrderItem `json:"items"`
		Customer struct {
			Name       string `json:"name"`
			Email      string `json:"email"`
			Street     string `json:"street"`
			PostalCode string `json:"postal-code"`
			City       string `json:"city"`
		} `json:"customer"`
	} `json:"order"`
}

func makeOrdersHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			_ = json.NewEncoder(w).Encode(map[string]string{"error": "method not allowed"})
			return
		}

		decoder := json.NewDecoder(r.Body)
		decoder.UseNumber()

		var req OrderRequest
		if err := decoder.Decode(&req); err != nil {
			log.Error().Err(err).Msg("invalid json payload")
			w.WriteHeader(http.StatusBadRequest)
			_ = json.NewEncoder(w).Encode(map[string]string{"error": "invalid json payload"})
			return
		}

		for _, item := range req.Order.Items {
			// Normalize ID to string (support numeric or string IDs)
			var idStr string
			switch v := item.ID.(type) {
			case string:
				idStr = v
			case json.Number:
				idStr = v.String()
			default:
				w.WriteHeader(http.StatusBadRequest)
				_ = json.NewEncoder(w).Encode(map[string]string{"error": "invalid item id"})
				return
			}
			if idStr == "" {
				w.WriteHeader(http.StatusBadRequest)
				_ = json.NewEncoder(w).Encode(map[string]string{"error": "item id is required"})
				return
			}

			if _, err := item.Price.Float64(); err != nil {
				log.Error().Err(err).Str("itemId", idStr).Msg("invalid item price")
				w.WriteHeader(http.StatusBadRequest)
				_ = json.NewEncoder(w).Encode(map[string]string{"error": "invalid item price"})
				return
			}

			if item.Quantity <= 0 {
				w.WriteHeader(http.StatusBadRequest)
				_ = json.NewEncoder(w).Encode(map[string]string{"error": "item quantity must be positive"})
				return
			}
		}

		if req.Order.Customer.Name == "" || req.Order.Customer.Email == "" {
			w.WriteHeader(http.StatusBadRequest)
			_ = json.NewEncoder(w).Encode(map[string]string{"error": "missing required fields"})
			return
		}

		orderID := strconv.Itoa(100000 + rand.Intn(899999))
		log.Info().Str("orderId", orderID).Str("customer", req.Order.Customer.Name).Msg("order received")

		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]string{"orderId": orderID})
	}
}
