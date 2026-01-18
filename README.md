🚀 TaskFlow: Full-Stack Architecture Blueprint
TaskFlow is a production-ready, full-stack task management application designed to serve as a reference implementation for modern web development. It demonstrates best practices in project structure, state management, and security using Go and React.

🛠 Tech Stack
Backend
Language: Go (1.23+)

Framework: Gin Gonic (High-performance HTTP web framework)

Database: PostgreSQL

Auth: JWT (JSON Web Tokens) with Bcrypt password hashing

Middleware: Custom CORS and Authentication handlers

Frontend
Core: React 19 + Vite

Routing: TanStack Router (Fully type-safe, file-based routing)

Data Fetching: TanStack Query v5 (Asynchronous state management)

State Management: Zustand (Client-side persistence)

Styling: Tailwind CSS + Shadcn/UI

Forms: React Hook Form + Zod (Schema validation)

🏛 Architectural Principles
This project implements several advanced patterns intended for long-term scalability:

1. Feature-Based Directory Structure (Frontend)
   Instead of grouping files by type (e.g., all components in one folder), the frontend is organized by domain features (Auth, Tasks).

Encapsulation: Each feature contains its own API calls, hooks, and UI components.

Reusability: Features can be easily moved or shared between projects.

2. Decoupled State Management
   We differentiate between Server State and Client State:

Server State (TanStack Query): Handles caching, loading states, and data synchronization with the Go API.

Client State (Zustand): Handles UI-only state like user authentication data and theme preferences, persisted in localStorage.

3. Automated Network Layer (Axios Interceptors)
   The application uses a centralized Axios instance with interceptors:

Request Interceptor: Automatically injects the JWT token from the Zustand store into every outgoing request.

Response Interceptor: Monitors for 401 Unauthorized errors to automatically trigger a logout and redirect when the session expires.

📂 Project Structure
Frontend (/frontend)
Plaintext

src/
├── components/ # Shared UI components (shadcn/ui)
│ └── layout/ # Global Layout (Header, Footer)
├── features/ # Encapsulated business logic
│ ├── auth/ # Auth store, login/register logic
│ └── tasks/ # Task items, forms, and Query hooks
├── lib/ # Core configurations (api.ts, utils.ts)
└── routes/ # Type-safe routing tree
Backend (/backend)
Plaintext

internal/
├── handlers/ # HTTP controllers (logic)
├── middleware/ # JWT Auth & CORS guards
├── models/ # DB schemas and DTOs
└── repository/ # Database access layer (SQL)
cmd/
└── main.go # Application entry point
🔑 Key Reference Implementations
Auth Guard: See src/routes/tasks.tsx for how to protect routes using beforeLoad.

Optimistic UI: Example of how React Query handles data mutations.

Form Validation: Use of zod schema to prevent invalid API submissions.

Go Middleware: Standard JWT verification pattern in middleware/auth.go.

🚦 Getting Started
Prerequisites
Go 1.23+

Node.js 20+

PostgreSQL instance

Setup
Clone & Install:

Bash

git clone <repo-url>
cd taskflow/backend && go mod download
cd ../frontend && npm install
Environment: Configure your .env for the backend (DB_URL, JWT_SECRET).

Run:

Backend: go run cmd/main.go

Frontend: npm run dev

Design Philosophy: This repository is not just a "To-Do app". It is a Blueprint. Every line of code is written to be readable, maintainable, and serve as a "copy-paste" foundation for professional-grade projects.
