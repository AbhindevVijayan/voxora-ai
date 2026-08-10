# High-Fidelity Voiceover Generator

High-Fidelity Voiceover Generator is a full-stack application for creating high-quality voiceovers from text. It provides a Django-based backend that integrates with external TTS services and a Vite + React frontend for composing scripts, selecting voices, and managing generated audio.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
	- [Backend (Django)](#backend-django)
	- [Frontend (React + Vite)](#frontend-react--vite)
- [Environment Variables](#environment-variables)
- [API & Usage](#api--usage)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Generate natural-sounding voiceovers using external TTS providers
- Multiple voice selection and configurable audio quality
- Web UI for composing text and managing history
- Modular backend service layer (see `backend/services`)

## Architecture

- Backend: Django project located in the `backend/` directory. The voice logic lives under `backend/apps/voiceover/` and external integrations are under `backend/services/`.
- Database: default SQLite for development (`backend/db.sqlite3`). Production should use a managed RDBMS.
- Frontend: React + Vite app in the `frontend/` directory.
- Media: generated audio files are stored under `backend/media/generated_voices/`.

## Prerequisites

- Python 3.10+ (recommended)
- Node.js 18+ and npm (or yarn/pnpm)
- Git

## Quick Start

Follow these steps to run the project locally on Windows. Replace commands with the POSIX equivalents on macOS/Linux.

### Backend (Django)

1. Create and activate a virtual environment, then install Python dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r backend/requirements.txt
```

2. Apply migrations and create a superuser (optional):

```powershell
cd backend
python manage.py migrate
python manage.py createsuperuser
```

3. Run the development server:

```powershell
python manage.py runserver
```

The backend API will be available at `http://127.0.0.1:8000/`.

### Frontend (React + Vite)

From the repo root:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on Vite's default port (usually `http://localhost:5173`). It will make API calls to the backend; update the backend URL in `frontend/src/api/api.js` if necessary.

## Environment Variables

Create a `.env` file for local development (backend) or set environment variables in your hosting platform.

- `DJANGO_SECRET_KEY` — Django secret key (use a strong random string in production)
- `DEBUG` — `True` or `False` (set `False` in production)
- `DATABASE_URL` — Optional, if using a different DB in production
- `ELEVENLABS_API_KEY` — (or other provider API keys) for the TTS integration used in `backend/services`.

Check `backend/services/elevenlabs.py` for the expected provider configuration.

## API & Usage

All API routes are defined in the backend Django project. See [backend/urls.py](backend/urls.py) and the voiceover app routes in [backend/apps/voiceover/urls.py](backend/apps/voiceover/urls.py) for details.

Typical flow:

- POST text and voice selection to the voice generation endpoint (the frontend handles this)
- Server triggers the external TTS service, saves the resulting audio to `backend/media/generated_voices/`, and returns metadata including a download URL

Example (replace with actual endpoint path after checking backend URLs):

```bash
curl -X POST "http://127.0.0.1:8000/api/voiceover/generate/" \
	-H "Content-Type: application/json" \
	-d '{"text": "Hello world", "voice": "alloy"}'
```

## Development

- Backend code: `backend/apps/voiceover/` contains models, serializers, views, and tests.
- Services: `backend/services/` contains integration code for external TTS providers (see `elevenlabs.py`).
- Frontend components are in `frontend/src/components/` and pages in `frontend/src/pages/`.

Common tasks:

- Run backend tests:

```powershell
cd backend
python manage.py test
```

- Lint frontend code:

```bash
cd frontend
npm run lint
```

## Deployment

This repository is structured for easy deployment. High-level recommendations:

- Backend: use a production WSGI/ASGI server (Gunicorn/Uvicorn) behind an HTTPS-enabled reverse proxy (nginx). Configure static/media storage (S3 or managed file storage) and a production database.
- Frontend: build static assets with `npm run build` and serve via CDN or webserver.
- Set `DEBUG=False` and provide secure environment variables in the host environment.

## Contributing

- Fork the repo, create a feature branch, and open a pull request with tests and a description.
- Run backend tests and frontend linting before submitting.

## License

This project is provided under the license in the repository root. See the `LICENSE` file for details.

## Credits

- Original author: Abhindev Vijayan

