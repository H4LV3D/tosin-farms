# Tosin Farms - E-Commerce Platform

Welcome to the Tosin Farms E-Commerce Platform repository! This project is a full-stack web application designed to sell fresh produce (like cassava, maize, and fruits) and artisan-processed foods directly to customers.

## 🏗️ Project Structure

This project is structured as a monorepo containing both the frontend and backend applications in their respective directories.

```text
tosin-farms/
├── backend/    # NestJS API Server
├── frontend/   # Next.js Web Application
└── README.md   # This file
```

---

## 💻 Frontend (`/frontend`)

The frontend is a modern, responsive web application built with **Next.js**. It features a clean, earthy design aesthetic suited for a farm-to-table business.

### Tech Stack
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS, Shadcn UI (Radix UI primitives)
* **State Management & Data Fetching:** `@tanstack/react-query`, Axios, Zustand
* **Forms & Validation:** React Hook Form, Zod
* **Authentication/Emails:** Nodemailer (via Next.js API routes for password resets)

### Key Features
* **Shop Page:** Browse categories (`Cassava`, `Maize`, `Processed Foods`, etc.) and view products.
* **Authenticated User Portal:** Secure routes (`/orders`, `/tracking`, `/payments`, `/profile`) accessible only to logged-in users.
* **Admin Dashboard:** Secure portal (`/admin/*`) for managing products and customer orders (requires admin role).
* **Forgot/Reset Password Flow:** Complete email-based password reset using Nodemailer.

### Quick Start (Frontend)
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Setup environment variables: Create a `.env.local` file (see `.env.local.example` if available, typically requires `NEXT_PUBLIC_API_URL`, `EMAIL_HOST`, `EMAIL_USER`, etc.)
4. Run the development server: `npm run dev`
5. Open [http://localhost:9000](http://localhost:9000) in your browser.

---

## ⚙️ Backend (`/backend`)

The backend is a robust REST API built with **NestJS** that powers the frontend application, managing products, categories, users, and orders.

### Tech Stack
* **Framework:** NestJS
* **Language:** TypeScript
* **Database ORM:** Prisma
* **Authentication:** Passport.js (JWT, Google OAuth2.0)
* **Caching:** Redis (`cache-manager`)

### Key Features
* **User Authentication:** JWT-based auth and Google OAuth login integration.
* **E-commerce APIs:** Endpoints for fetching products, categories, placing orders, etc.
* **Caching:** Integrated Redis to cache high-frequency read requests (like the product catalog).

### Quick Start (Backend)
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Setup environment variables: Ensure your `.env` contains the required database URLs (`DATABASE_URL`), JWT secrets, and Redis connection strings.
4. Run Prisma migrations (if applicable): `npx prisma migrate dev`
5. Run the development server: `npm run start:dev`
6. The API will be available at [http://localhost:8000](http://localhost:8000) (or the port specified in your `.env`).

---

## 🤝 Contributing
When contributing to this repository, please ensure you are working on a dedicated branch and running the appropriate format and lint scripts before submitting a pull request.

* Frontend Linting: `cd frontend && npm run lint`
* Backend Linting/Formatting: `cd backend && npm run lint && npm run format`
