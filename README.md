# Dashboard - Full Stack Application

A modern full-stack dashboard application with **FastAPI** backend and **React + TypeScript** frontend.

---

## Project Structure

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

## Tech Stack

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

## Getting Started

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

## Development

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

## Build & Deploy

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

## Available Scripts

| Command                    | Description                   |
| -------------------------- | ----------------------------- |
| `npm run dev`              | Run both backend and frontend |
| `npm run dev:backend`      | Run backend only              |
| `npm run dev:frontend`     | Run frontend only             |
| `npm run install:frontend` | Install frontend dependencies |
| `npm run build:frontend`   | Build frontend for production |
| `npm run preview:frontend` | Preview production build      |

---

## API Endpoints

**Base URL:** `http://localhost:9000`

- `GET /` - Root endpoint
- `GET /health` - Health check
- More endpoints in `backend/app/routes/`

---

## Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:9000
```

---

## Dependencies

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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Author

**Vaidiasri**

- GitHub: [@Vaidiasri](https://github.com/Vaidiasri)

---

## Acknowledgments

- React documentation
- Railway.app for hosting

---

## Data Seeding

To populate the database with dummy data (users and feature clicks) for testing:

1.  **Ensure backend virtual environment is active.**
2.  **Run the seed script:**

```bash
cd backend
python seed.py
```

This will:

- Reset the database (Drop/Create tables)
- Create 20+ dummy users
- Generate 150+ feature clicks across different dates
- **Restart the backend server** after seeding to see changes.

---

## Scaling Architecture (Essay)

**Q: If this dashboard needed to handle 1 million write-events per minute, how would you change your backend architecture?**

**A:**
Handling 1 million events per minute (~16k/sec) requires moving away from synchronous database writes for every API call. Here is the proposed architecture evolution:

1.  **Ingestion Layer (Decoupling):** Replace direct DB writes with a high-throughput message queue like **Apache Kafka** or **RabbitMQ**. The `/track` endpoint would simply push events to a queue and return immediately (200 OK), ensuring low latency.
2.  **Stream Processing:** Use consumers (e.g., Python workers or a stream processor like Flink/Spark) to batch process events from the Queue. Aggregations (e.g., clicks per hour) can be pre-calculated in real-time.
3.  **Database Optimization:**
    - **Write-Heavy DB:** Use **Cassandra** or **ScyllaDB** (Time-Series optimized) for storing raw event logs instead of PostgreSQL.
    - **Read-Heavy DB:** Keep PostgreSQL for User data and relational metadata. Use **Redis** to cache pre-aggregated analytics data for the dashboard.
4.  **Load Balancing:** Deploy the backend API behind a load balancer (e.g., Nginx or AWS ALB) and horizontally scale the API instances to handle the incoming request volume.
