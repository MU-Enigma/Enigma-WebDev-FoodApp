# Small Go image
FROM golang:1.21-bullseye AS build
WORKDIR /src
# Copy go.mod first; go.sum may not yet exist locally in some workflows.
# Running `go mod download` inside the build will populate go.sum in the container.
COPY go.mod ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags='-s -w' -o /bin/food-api ./

FROM gcr.io/distroless/static:nonroot
COPY --from=build /bin/food-api /food-api
EXPOSE 8080
ENTRYPOINT ["/food-api"]
