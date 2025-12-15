# Sweet Shop Management System (Frontend)

The frontend for the Sweet Shop Management System, built with React, Vite, and TypeScript.

## 🚀 Features
- **Premium UI**: Glassmorphism design, responsive grid, dark mode ready variables.
- **Real-time Search**: Filter sweets by name, category, and price range.
- **Authentication**: Secure Login and Registration forms.
- **Admin Dashboard**: Manage inventory (Add, Edit, Delete sweets).

## 🛠️ Technology Stack
- **Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: Vanilla CSS 3 (Custom Variables & Glassmorphism)
- **State/Auth**: Context API + JWT
- **Networking**: Axios

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Installation
```bash
npm install
```

### 2. Development
To run locally:
```bash
npm run dev
# App runs on http://localhost:5173
```
*Note: Make sure the Backend is running on `http://localhost:3000`.*

## 🌍 Deployment (Vercel)

1.  **Import Project**: Import this repository (`sweet-shop-frontend`) on Vercel.
2.  **Framework Preset**: Select "Vite".
3.  **Environment Variables**:
    *   `VITE_API_URL`: **(Your Render Backend URL)**
        *   Example: `https://sweet-shop-backend-2-u411.onrender.com`
4.  **Deploy**.
