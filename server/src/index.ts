import express, { type Request, type Response, type NextFunction } from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { pool } from "./db.js";
//import apiRoutes from "./routes.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000


app.set("trust proxy", 1);


// ---------- CORS ----------
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});


// ---------- Global error handler ----------
type HttpError = Error & {
  status?: number;
  http_code?: number;
  code?: string;
};


app.use(
  (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    console.error("=== ERROR ===");
    console.error("message:", err.message);
    console.error("stack:  ", err.stack?.split("\n").slice(0, 4).join("\n"));

    res.status(err.status || err.http_code || 500).json({
      error: err.message || "Unknown error",
    });
  }
);


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});