# Workshop DevOps 2026.1 — Docker Challenge

## Your Task
Create the two `Dockerfile`s and the `docker-compose.yml` from scratch.

## Project Structure
```
.
├── django_app/          ← Python/Django backend (API)
│   ├── core/            ← Django project settings
│   ├── api/             ← Login + health endpoints
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile       ← YOU CREATE THIS
├── nextjs_app/          ← Next.js frontend
│   ├── app/
│   │   ├── layout.js
│   │   └── page.js
│   ├── package.json
│   ├── next.config.js
│   └── Dockerfile       ← YOU CREATE THIS
├── .env                 ← credentials (already provided)
└── docker-compose.yml   ← YOU CREATE THIS
```

## Requirements

### django_app/Dockerfile
- Base image: `python:3.12-slim`
- Working dir: `/app`
- Install dependencies from `requirements.txt`
- Expose port `8000`
- Start with: `gunicorn core.wsgi:application --bind 0.0.0.0:8000 --workers 2`

### nextjs_app/Dockerfile
- Multi-stage build using `node:20-alpine`
- Stage 1 (deps): install npm dependencies
- Stage 2 (builder): build the Next.js app
- Stage 3 (runner): run with `node server.js`
- Expose port `3000`

### docker-compose.yml
- Two services: `backend` (port 8000) and `frontend` (port 3000)
- Load credentials from `.env` file
- Frontend depends on backend

## Running
```bash
docker compose up --build
```

Then open: http://localhost:3000

## Credentials
Check the `.env` file — credentials are loaded from there.

## Success
When you log in successfully you will see a green ✓ "Test Completed" screen with all checks passed.
