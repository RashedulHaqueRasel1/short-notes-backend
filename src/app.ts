import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env";
import authRoutes from "./modules/auth/auth.route";
import noteRoutes from "./modules/note/note.route";
import syncRoutes from "./modules/sync/sync.route";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend
    credentials: true,
  }),
);
app.use(express.json());

if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.get("/health", (req, res) => {
  res.status(200).json({
    ok: true,
    time: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/sync", syncRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
