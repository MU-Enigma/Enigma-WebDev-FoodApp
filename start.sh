#!/bin/bash

echo "Food Order Application - Quick Start"
echo "======================================"
echo ""

# Check for Docker
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed. Please install Docker first."
    exit 1
fi

# Check for Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "Error: Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "Starting application with Docker Compose..."
docker-compose up --build

echo ""
echo "Application started successfully!"
echo "Frontend: http://localhost"
echo "API: http://localhost:8080"
echo "Press Ctrl+C to stop all services"
