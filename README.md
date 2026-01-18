# 🚀 TaskFlow: Full-Stack Reference & Blueprint

This is a clean, working full-stack application built to serve as a **reference (blueprint)** for future projects. It implements a solid architecture without unnecessary complexity.

Use this repo to copy-paste patterns for Auth, Routing, and State Management.

## 🛠 Tech Stack

- **Backend:** Go (Gin) + PostgreSQL
- **Frontend:** React 19 + Vite
- **Routing:** TanStack Router (File-based, type-safe)
- **State:** TanStack Query (Server state) + Zustand (Client state)
- **UI:** Tailwind CSS + Shadcn/UI

## 💡 Key Architectural Patterns

This project demonstrates how to correctly implement:

1.**JWT Authentication:** Complete flow with access tokens, secure storage, and Axios interceptors. 2.**Protected Routes:** Using `beforeLoad` in TanStack Router to redirect unauthenticated users. 3.**Feature-Based Structure:** Organizing code by features (`features/auth`, `features/tasks`) instead of generic types. 4.**Form Validation:** Using React Hook Form + Zod.

## ✅ Core Features

- Full Auth flow (Register / Login / Logout)
- Task Management (Create, Read, Update, Delete)
- Task Filtering (All / Active / Completed)
- Expandable task descriptions

## 🚀 Quick Start

### 1. Backend

Make sure PostgreSQL is running and your `.env` is set up.

```bash
cd backend
go mod download
go run cmd/main.go
```

### 1. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will run at http://localhost:5173.
