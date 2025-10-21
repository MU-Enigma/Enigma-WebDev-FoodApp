Food Go API

Quickstart

Requirements:
- Go 1.21+
- Docker (optional if you use docker-compose)

Run locally (requires Postgres + Redis reachable from env):

```bash
# build
go build ./...
# run
DATABASE_URL=postgres://postgres:postgres@localhost:5432/fooddb?sslmode=disable REDIS_ADDR=localhost:6379 ./food-go-api
```

Run with docker-compose (recommended for local dev):

```bash
docker-compose up --build
```

Notes:
- `/meals` supports Redis hot reads + Postgres fallback.
- Handlers respect request-scoped context timeouts (3s for /meals).
- Structured logging via zerolog is enabled.
- Prometheus metrics are available at /metrics.
- This is a scaffold: add gRPC endpoints, prepared statements, and more production hardening as needed.

WSL / Local Windows notes
-------------------------
If you're on Windows we recommend running Postgres and Redis inside WSL2 (Ubuntu) and running the API from WSL. WSL forwards localhost to Windows so the frontend (running on Windows) can still call the API at http://localhost:8080.

WSL quickstart (tested):

```bash
# install dependencies in WSL
sudo apt update
sudo apt install -y postgresql postgresql-contrib redis-server golang-go

# start services
sudo service postgresql start
sudo service redis-server start

# create DB and seed (run as postgres user)
sudo -u postgres psql -c "CREATE DATABASE fooddb OWNER postgres;"
sudo -u postgres psql -d fooddb -f /mnt/d/Downloads/Enigma-WebDev-FoodApp-main/Enigma-WebDev-FoodApp-main/services/go-api/initdb/init.sql

# run the API (from repo path mounted under /mnt/d/...)
cd /mnt/d/Downloads/Enigma-WebDev-FoodApp-main/Enigma-WebDev-FoodApp-main/services/go-api
export GOPROXY="https://proxy.golang.org,direct"
export DATABASE_URL='postgres://postgres:postgres@localhost:5432/fooddb?sslmode=disable'
export REDIS_ADDR='localhost:6379'
go run .
```

Troubleshooting tips
- If `go run .` fails because modules are missing, run `go mod tidy` to populate `go.sum`.
- If the API cannot connect to Postgres: `sudo service postgresql status` and `sudo -u postgres psql -d fooddb -c "\dt"`.
- If Redis isn't reachable: `redis-cli ping` should return `PONG`.
- If the frontend cannot reach the API from Windows: double-check the API is listening on localhost:8080 in WSL (`ss -ltnp | grep 8080`) and that Windows/WSL networking is functioning.
