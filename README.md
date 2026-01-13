# 🚀 Dashboard - Full Stack Application

A modern full-stack dashboard application with **FastAPI** backend and **React + TypeScript** frontend.

---

## 📁 Project Structure

```
dashboard/
├── backend/              # FastAPI Backend
│   ├── app/             # Application modules
│   │   ├── config/      # Configuration
│   │   ├── model/       # Database models
│   │   ├── routes/      # API routes
│   │   ├── schema/      # Pydantic schemas
│   │   └── untils/      # Utilities
│   ├── main.py          # Entry point
│   ├── requirements.txt # Python dependencies
│   ├── Procfile         # Deployment config
│   └── runtime.txt      # Python version
│
├── frontend/            # React + TypeScript Frontend
│   ├── src/            # Source code
│   ├── public/         # Static assets
│   ├── package.json    # Node dependencies
│   └── vite.config.ts  # Vite configuration
│
└── package.json        # Root scripts (monorepo)
```

---

## 🛠️ Tech Stack

### Backend

- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Database
- **SQLAlchemy** - ORM
- **Pydantic** - Data validation

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **ESLint** - Code linting

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL

### Installation

**1. Clone the repository:**

```bash
git clone https://github.com/Vaidiasri/dashboard.git
cd dashboard
```

**2. Install root dependencies:**

```bash
npm install
```

**3. Setup Backend:**

```bash
cd backend
python -m venv myenv
myenv\Scripts\activate  # Windows
# source myenv/bin/activate  # Linux/Mac
pip install -r requirements.txt
```

**4. Configure Environment:**
Create `backend/.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

**5. Setup Frontend:**

```bash
cd frontend
npm install
```

---

## 💻 Development

### Run Both Servers (from root):

```bash
npm run dev
```

### Run Individually:

**Backend only:**

```bash
npm run dev:backend
# or
cd backend
python main.py
```

**Frontend only:**

```bash
npm run dev:frontend
# or
cd frontend
npm run dev
```

---

## 🏗️ Build & Deploy

### Build Frontend:

```bash
npm run build:frontend
```

### Preview Production Build:

```bash
npm run preview:frontend
```

### Deployment

**Recommended: Railway.app**

1. **Backend Service:**

   - Root Directory: `backend`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

2. **Frontend Service:**

   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run preview -- --host 0.0.0.0 --port $PORT`

3. **Database:**
   - Add PostgreSQL service
   - Copy `DATABASE_URL` to backend environment variables

See [DEPLOYMENT_GUIDE.md](backend/DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 📝 Available Scripts

| Command                    | Description                   |
| -------------------------- | ----------------------------- |
| `npm run dev`              | Run both backend and frontend |
| `npm run dev:backend`      | Run backend only              |
| `npm run dev:frontend`     | Run frontend only             |
| `npm run install:frontend` | Install frontend dependencies |
| `npm run build:frontend`   | Build frontend for production |
| `npm run preview:frontend` | Preview production build      |

---

## 🔧 API Endpoints

**Base URL:** `http://localhost:9000`

- `GET /` - Root endpoint
- `GET /health` - Health check
- More endpoints in `backend/app/routes/`

---

## 🌐 Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:9000
```

---

## 📦 Dependencies

### Backend

- fastapi
- uvicorn
- sqlalchemy
- psycopg2-binary
- python-dotenv
- pydantic

### Frontend

- react
- react-dom
- typescript
- vite
- @vitejs/plugin-react

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Vaidiasri**

- GitHub: [@Vaidiasri](https://github.com/Vaidiasri)

---

## 🙏 Acknowledgments

- FastAPI documentation
- React documentation
- Railway.app for hosting
