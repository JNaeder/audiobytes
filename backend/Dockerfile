# Build File
FROM golang:1.20-alpine as build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o api .

# Final Container
FROM alpine:latest
WORKDIR /app
COPY --from=build /app/api .
COPY --from=build /app/.env .
EXPOSE 8080
CMD ["./api"]