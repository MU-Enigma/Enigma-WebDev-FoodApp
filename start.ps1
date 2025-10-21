# Food Order Application - Quick Start

Write-Host "Food Order Application - Quick Start" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""

# Check for Docker
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Docker is not installed. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Check for Docker Compose
if (!(Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Docker Compose is not installed. Please install Docker Compose first." -ForegroundColor Red
    exit 1
}

Write-Host "Starting application with Docker Compose..." -ForegroundColor Yellow
docker-compose up --build

Write-Host ""
Write-Host "Application started successfully!" -ForegroundColor Green
Write-Host "Frontend: http://localhost" -ForegroundColor Cyan
Write-Host "API: http://localhost:8080" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop all services" -ForegroundColor Yellow
