# Cinematic 2D Election Education Platform

This project is a high-performance, interactive, and beautifully designed web platform built to educate users on the election process. It combines a premium 2D glass-morphic UI with advanced gamification and real-time AI assistance to create an engaging learning experience.

## Core Features

- **Interactive Mock Polling Simulation**: Users experience the entire end-to-end voting process.
- **Real-Time AI Assistant**: A dedicated AI agent (powered by Gemini 1.5 Flash) provides instant, educational answers to any election-related question.
- **Gamification**: Visual celebrations and progress tracking encourage learning retention.
- **Robust Security**: Fully authenticated backend with JWT, bcrypt hashing, and restrictive CORS policies.
- **Accessibility (a11y) First**: Compliant with WCAG standards, featuring full keyboard navigation and ARIA support.

## Tech Stack

### Frontend
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Vanilla CSS (CSS Variables for tokens) + Framer Motion for cinematic animations
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI (Python)
- **Database**: SQLite with SQLAlchemy ORM
- **AI Integration**: Google Generative AI (Gemini) SDK
- **Security**: OAuth2PasswordBearer, PyJWT, passlib/bcrypt

## Local Development

### Requirements
- Node.js >= 18
- Python >= 3.11

### Start the Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

### Start the Frontend
```bash
npm install
npm run dev
```

## Production Deployment (Google Cloud Run)
This application includes a hardened `Dockerfile` designed for zero-config deployments to Google Cloud Run. The build process statically compiles the Vite frontend and mounts it alongside the FastAPI ASGI server.

1. Connect your GitHub repository to Cloud Build / Cloud Run.
2. Select the repository and branch.
3. Add the `GEMINI_API_KEY` and `SECRET_KEY` into the Cloud Run Environment Variables dashboard.
4. Deploy!

---

*Built for the Google Prompt Wars Challenge.*
