# Sweet Shop Management System

A full-stack application to manage sweet inventory, pricing, and sales, featuring a modern, premium user interface.

## 🚀 Features
- **Frontend**: Single Page Application (SPA) built with React + Vite + TypeScript.
    - **Premium UI**: Glassmorphism design, responsive grid, dark mode ready variables.
    - **Real-time Search**: Filter sweets by name, category, and price range.
    - **Authentication**: Secure Login and Registration forms.
    - **Admin Dashboard**: Manage inventory (Add, Edit, Delete sweets).
- **Backend**: RESTful API built with Node.js, Express, and Prisma.
    - **Database**: PostgreSQL (Production Ready).
    - **Security**: JWT Authentication and RBAC (User vs Admin).
    - **Search API**: Robust filtering endpoint.

## 🛠️ Technology Stack
- **Frontend**: React, TypeScript, Vite, Vanilla CSS 3 (Custom Design), Lucide Icons, Axios.
- **Backend**: Node.js, Express.js, TypeScript, Prisma ORM, JSON Web Token (JWT).
- **Database**: PostgreSQL (Render Compatible).
- **Testing**: Jest, Supertest.

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm
- PostgreSQL (or use Render)

### 1. Backend Setup

```bash
cd backend
npm install

# Setup Database & Migrations
# Note: Update .env with your PostgreSQL Connection String
npx prisma migrate dev --name init

# Start Server
npm run dev
# Server runs on http://localhost:3000
```

### 2. Deployment (Render)
This project is configured for **Render**.
1.  **Backend**: `npm install && npm run build` (Start: `npm start`).
2.  **Database**: Create a PostgreSQL instance on Render and link it.

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
Please place your screenshots in the `frontend/public/screenshots/` folder.

- **Admin Dashboard**: `frontend/public/screenshots/admin dashboard.png`
- **Signup Page**: `frontend/public/screenshots/signup page.png`
- **User Sign In**: `frontend/public/screenshots/user sign in.png`

## 🏗️ Why is this "Enterprise Level"?
This backend isn't just a simple script; it follows industry-standard **Clean Architecture** principles:

1.  **Layered Architecture**:
    *   **Controllers**: Handle HTTP requests and validation only.
    *   **Services**: Contain pure business logic (independent of HTTP or Database).
    *   **Repositories**: Handle direct database access (Prisma). This allows swapping the DB without breaking business logic.
2.  **DTOs & Type Safety**: Strict TypeScript interfaces for all inputs/outputs ensures reliability and auto-completion.
3.  **RBAC (Role Based Access Control)**: Secure middleware (`requireRole`) ensures granulary security (Admins vs Users).
4.  **Scalable Auth**: Stateless JWT authentication allows the server to scale horizontally (serverless ready).


## 🤖 My AI Usage (Co-authorship)
This project was developed with the little assistance of **ChatGPT**.

### How AI was used:
"With AI, I can debug and get the prototype. That's it."
