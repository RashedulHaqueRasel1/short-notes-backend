# Short Notes Backend

> Production-ready Node.js + Express + TypeScript backend for the Short Notes application.

## 📌 Overview

This project serves as the backend API for the Short Notes application. It follows a modular **MVC (Model-View-Controller)** architecture and is built with **Node.js, Express, and TypeScript**.

The primary purpose of this system is to handle:

- **User Authentication**: Secure registration and login using JWT.
- **Note Management**: Create, read, update, and delete (CRUD) operations for notes.
- **Synchronization**: Sync capabilities to handle offline/online data consistency (basic implementation).
- **Data Validation**: Strict request validation using Zod.

## 📂 Project Structure

The project is organized by feature modules rather than technical layers, making it scalable and easy to maintain.

```
src/
├── config/             # Configuration files (DB, Env variables)
│   ├── db.ts           # MongoDB connection logic
│   └── env.ts          # Zod-validated environment variables
├── middlewares/        # Global and specific middlewares
│   ├── errorHandler.ts # Global error handling
│   ├── requireAuth.ts  # JWT authentication middleware
│   └── notFound.ts     # 404 Route handler
├── modules/            # Feature-based, self-contained modules
│   ├── auth/           # Authentication module (Register, Login)
│   ├── user/           # User data model
│   ├── note/           # Note management (CRUD)
│   └── sync/           # Sync logic
├── utils/              # Helper functions and utilities
│   ├── apiResponse.ts  # Standardized API response helper
│   ├── asyncHandler.ts # Wrapper for async route handling
│   └── AppError.ts     # Custom Error class for operational errors
├── app.ts              # Express application setup (Middlewares, Routes)
└── server.ts           # Server entry point
```

## 🔄 Data Flow & Architecture

1.  **Request**: The Client (Frontend) sends an HTTP request (e.g., `POST /api/notes`) to the Server.
2.  **App & Middleware**: `app.ts` receives the request. Global middlewares (CORS, JSON parser) run. Request hits the Router.
3.  **Routing**: The request is routed to the specific module (e.g., `note.route.ts`).
4.  **Route Middleware**: Specific checks run (e.g., `requireAuth` verifies the JWT token).
5.  **Controller**: If authorized, `note.controller.ts` handles the request. It first calls **Zod Validation** schemas.
6.  **Service**: Validated data is passed to `note.service.ts`, which contains the business logic.
7.  **Database**: The service interacts with MongoDB using Mongoose models (`note.model.ts`).
8.  **Response**: The result bubbles back up. The controller uses `apiResponse` to send a standardized JSON response back to the client.
9.  **Error Handling**: If any step fails (validation error, DB error), the error is thrown to the global `errorHandler`.

## 🔐 Authentication & Security

- **JWT (JSON Web Tokens)**: Used for stateless authentication.
  - On **Login/Register**, the server issues a standard JWT.
- **Protection**: content-sensitive routes (like Notes) are protected by the `requireAuth` middleware.
  - Clients must send the token in the `Authorization` header: `Bearer <token>`.
- **Passwords**: Hashed securely using `bcryptjs` before storage.

## 🚀 API Endpoints

All API routes are prefixed with `/api`.

| Module     | Method | Endpoint             | Description               | Auth Required |
| :--------- | :----- | :------------------- | :------------------------ | :-----------: |
| **Auth**   | POST   | `/api/auth/register` | Register a new user       |      ❌       |
| **Auth**   | POST   | `/api/auth/login`    | Login user & get Token    |      ❌       |
| **Notes**  | GET    | `/api/notes`         | Get all user's notes      |      ✅       |
| **Notes**  | POST   | `/api/notes`         | Create a new note         |      ✅       |
| **Notes**  | GET    | `/api/notes/:id`     | Get specific note details |      ✅       |
| **Notes**  | PUT    | `/api/notes/:id`     | Update a note             |      ✅       |
| **Notes**  | DELETE | `/api/notes/:id`     | Delete a note             |      ✅       |
| **Sync**   | POST   | `/api/sync`          | Sync notes from client    |      ✅       |
| **Health** | GET    | `/health`            | Server health check       |      ❌       |

## 🛠️ Environment Variables

The application requires specific environment variables to run.

1.  Copy `.env.example` to `.env`:

    ```bash
    cp .env.example .env
    ```

2.  Update the values:
    - `PORT`: Server port (default: 5000)
    - `MONGO_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/short-notes-db`)
    - `JWT_SECRET`: A long, random string used to sign tokens.
    - `NODE_ENV`: `development` or `production`.

## ⚙️ Installation & Running Locally

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB running locally or a cloud URI

### Steps

1.  **Install Dependencies**

    ```bash
    npm install
    ```

2.  **Setup Environment**
    Configure your `.env` file as described above.

3.  **Run in Development**
    Starts the server with hot-reloading.

    ```bash
    npm run dev
    ```

4.  **Build & UI Production**
    Compile TypeScript to JavaScript (`dist/`) and run.
    ```bash
    npm run build
    npm start
    ```

## ⚠️ Interactions & Limitations

- **CORS**: The server is configured to accept requests from `http://localhost:3000` by default. If your frontend runs elsewhere, update the CORS configuration in `src/app.ts`.
- **Sync**: The `/sync` endpoint is a basic implementation returning recent updates. A full conflict-resolution strategy is not yet implemented.
- **Database**: Ensure MongoDB is running before starting the server, otherwise, the application will exit.

## 🐛 Error Handling

The application uses a centralized error handling mechanism.

- **AppError**: A custom class used to throw operational errors (e.g., 404 Not Found, 400 Bad Request) with specific status codes.
- **AsyncHandler**: A wrapper that catches asynchronous errors from controllers and passes them to the global error middleware, preventing server crashes.
- **Zod Errors**: Validation errors are caught and formatted into a readable message before being sent to the client.

---

**Happy Coding!** 🚀
