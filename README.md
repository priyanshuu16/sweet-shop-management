# Sweet Shop Management System

A full-stack application to manage sweet inventory, pricing, and sales, featuring a modern, premium user interface.

## 🚀 Features
- **Frontend**: Single Page Application (SPA) built with React + Vite + TypeScript.
    - **Premium UI**: Glassmorphism design, responsive grid, dark mode ready variables.
    - **Real-time Search**: Filter sweets by name, category, and price range.
    - **Authentication**: Secure Login and Registration forms.
    - **Admin Dashboard**: Manage inventory (Add, Edit, Delete sweets).
- **Backend**: RESTful API built with Node.js, Express, and Prisma.
    - **Database**: SQLite (Zero-config setup).
    - **Security**: JWT Authentication and RBAC (User vs Admin).
    - **Search API**: Robust filtering endpoint.

## 🛠️ Technology Stack
- **Frontend**: React, TypeScript, Vite, Vanilla CSS 3 (Custom Design), Lucide Icons, Axios.
- **Backend**: Node.js, Express.js, TypeScript, Prisma ORM, JSON Web Token (JWT).
- **Database**: SQLite (Local file-based).
- **Testing**: Jest, Supertest.

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Backend Setup
The backend uses SQLite, so no external database installation is required.

```bash
cd backend
npm install

# Setup Database & Migrations
echo 'DATABASE_URL="file:./dev.db"' > .env
echo 'JWT_SECRET="dev_secret_key"' >> .env
npx prisma migrate dev --name init

# Start Server
npm run dev
# Server runs on http://localhost:3000
```

### 2. Frontend Setup
```bash
cd frontend
npm install

# Start Dev Server
npm run dev
# App runs on http://localhost:5173
```

### 3. Running Tests (Backend)
```bash
cd backend
npm test
```

## 📸 Screenshots
*(Placeholders for actual screenshots)*
- **Dashboard**: A grid of colorful sweet cards with glassmorphism effects.
- **Login**: A split-screen login page with validation.
- **Search**: Interactive filters for refining the sweet list.

## 🤖 My AI Usage (Co-authorship)
This project was developed with the assistance of **Antigravity** (Google Deepmind's agentic coding assistant).

### How AI was used:
1.  **Architecture Design**: The AI proposed the folder structure, API contract, and component hierarchy based on the extensive requirements.
2.  **Code Generation**:
    -   **Backend**: Generated initial boilerplate for Express, Prisma schema, and Controller logic. Helped migrate from PostgreSQL to SQLite when local environment issues persisted.
    -   **Frontend**: Generated the complete React application structure, including the "glassmorphism" CSS variables and responsive layouts.
    -   **Tests**: Wrote Jest unit and integration tests (achieving 100% pass rate on 30 test cases).
3.  **Debugging**: Automated the diagnosis of TypeScript configuration errors (`tsconfig.json`) and fixed database connection issues by switching providers.

### Reflection
AI significantly accelerated the "boilerplate" phase (setting up Express/Vite) and ensured type safety across the full stack. The ability to request a "Top Notch" design and receive high-quality CSS variables without manual tweaking was a major efficiency boost. However, manual verification was strictly maintained to ensure business logic (like purchase validation) was correct.
