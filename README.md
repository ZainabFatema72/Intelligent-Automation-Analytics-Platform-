# Intelligent Automation and Analytics Platform (InsightEngine)

An enterprise-grade full-stack business intelligence and data analytics platform. The application enables users to ingest raw datasets, execute automated data cleaning pipelines using Pandas, and perform predictive analytics using Machine Learning algorithms, all managed through an interactive React dashboard.

---

## Key Features

* **Secure Authentication Engine:** Role-based access control (Admin and User roles) managed via JSON Web Tokens (JWT) and secure database verification.
* **Dynamic Metrics Visualizer:** A fully responsive grid system rendering live business metrics like Operational Efficiency, Average Target Growth, and cost trends.
* **Automated Data Ingestion:** Secure drag-and-drop file upload framework supporting large-scale CSV and Excel datasets.
* **Pandas Analytics Pipeline:** Backend processing system that dynamically audits row/column shapes, handles missing values, and structure statistical summaries into JSON formats.
* **ML Model Space:** Direct feature training interface executing target column prediction seamlessly mapped to custom asynchronous charts.

---

## Technical Architecture

### Frontend Stack
* React.js (Vite v8 Build Engine)
* Tailwind CSS Utility Framework
* Recharts (Responsive Vector Graphs)
* Axios HTTP Client

### Backend Stack
* Python Flask (REST API Framework)
* PyMySQL (Database Driver)
* PyJWT (Token Security)
* Bcrypt (Password Hashing)

### Database and Data Science
* MySQL Workbench (Relational Storage)
* Pandas Engine (Data Manipulation)
* Scikit-Learn (Machine Learning Models)

---

## Directory Structure

```text
intelligent-platform/
├── client/                     # React Frontend Application
│   ├── src/
│   │   ├── components/         # Reusable structural UI components (Sidebar, Layouts)
│   │   ├── pages/              # Application Views (Dashboard, Analytics, Upload)
│   │   ├── index.css           # Global Tailwind directives
│   │   └── main.jsx            # Application bootstrap configuration
│   ├── vite.config.js          # Vite compiler and plugin architecture
│   └── package.json            # Node dependencies and scripts
├── server/                     # Flask Backend Application
│   ├── analytics/              # Automated Pandas processing modules
│   │   └── processor.py        # Data cleaning and serialization logic
│   ├── ml/                     # Predictive modeling infrastructure
│   │   └── engine.py           # Model training and prediction runtime
│   ├── app.py                  # API gateway, routing, and database orchestration
│   └── config.py               # Global system configuration and environment mapping
└── README.md                   # Platform documentation

```

---

## Setup and Installation

### Prerequisites

* Node.js (v18.0.0 or higher)
* Python (v3.9.0 or higher)
* MySQL Server (v8.0 or higher)

### 1. Database Setup

1. Initialize your MySQL server and connect via MySQL Workbench or CLI.
2. Execute your schema initialization script to build the required tables (`users`, `datasets`, `reports`, `predictions`, `activity_logs`).
3. Run the following transactional seed script to establish the primary administrative account:

```sql
USE intelligence_platform;

INSERT INTO users (username, email, password_hash, role) 
VALUES ('Test Admin', 'admin@test.com', 'admin123', 'Admin');

COMMIT;

```

### 2. Backend Initialization

1. Open your terminal and navigate to the server directory:
```bash
cd server

```


2. Verify your database connection string, database name, and password configuration inside `app.py`.
3. Launch the development server:
```bash
python app.py

```


The backend service will initialize on `http://127.0.0.1:5000`.

### 3. Frontend Initialization

1. Open a separate terminal window and navigate to the client directory:
```bash
cd client

```


2. Install the required Node packages:
```bash
npm install

```


3. Execute the build command with cache invalidation to process the Tailwind configurations:
```bash
npm run dev -- --force

```


4. Launch the application in your browser at `http://localhost:5173/` and navigate to the dashboard login page.

---

## API Documentation

### Authentication

* **POST** `/api/auth/login` - Validates user credentials and returns a secure 24-hour access token along with user meta-data.

### Data Management

* **POST** `/api/data/upload` - Manages multipart file processing, triggers the Pandas optimization matrix, logs metadata records, and responds with statistical summaries.

### Predictive Engine

* **POST** `/api/ml/predict` - Targets specific columns within uploaded datasets, trains dynamic analytical models, and outputs predictive evaluations.


