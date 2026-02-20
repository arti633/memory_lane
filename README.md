# MemoryLane Personal

Monorepo scaffold for MemoryLane with Next.js frontend, Express backend, and separate AI service.

## Prerequisites
- Node.js 20+
- npm 10+
- Docker Desktop (for PostgreSQL)

## Quick Start
1. Copy env template:
   - `copy .env.example .env`
2. Start database:
   - `docker compose up -d`
3. Install dependencies:
   - `npm install`
4. Generate Prisma client:
   - `npm run prisma:generate -w server`
5. Run all services:
   - `npm run dev`

## Service URLs
- Frontend: http://localhost:3000
- Backend: http://localhost:4000/health
- AI Service: http://localhost:5000/health
