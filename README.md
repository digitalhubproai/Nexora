# Nexora CRM & ERP

This project consists of a FastAPI backend and a Next.js frontend.

## Connection Setup

- **Frontend**: Points to `https://creativesar-nexorabkup.hf.space/api/v1` via `NEXT_PUBLIC_API_URL` in `frontend/.env.local`.
- **Backend**: Allows origins `http://localhost:3000` via `CORS_ORIGINS` in `backend/.env`.

## Running the Application

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- PostgreSQL (or Neon DB as configured in `.env`)

### Easy Start (Root)
1. Install dependencies:
   ```bash
   npm run install:all
   ```
2. Start both services:
   ```bash
   npm run dev
   ```

### Individual Start
- **Backend**:
  ```bash
  cd backend
  pip install -r requirements.txt
  uvicorn app.main:app --reload
  ```
- **Frontend**:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
