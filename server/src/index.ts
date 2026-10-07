import express, { type Request, type Response, type NextFunction } from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { pool } from "./db.ts";
import apiRoutes from './routes/apiRoutes.ts';
import { sessionMiddleware } from "./middleware/session.ts";

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
app.use(sessionMiddleware);

app.use("/api", apiRoutes);

app.get("/health", async (_req: Request, res: Response) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", db: "connected" });
  } catch {
    res.status(500).json({ status: "error", db: "disconnected" });
  }
});


app.get("/:code", async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

   
    if (code === "favicon.ico" || code === "robots.txt") {
      return res.status(404).end();
    }

    const { rows } = await pool.query<{ url: string }>(
      `SELECT url FROM links WHERE code = $1`,
      [code]
    );

    const link = rows[0];
    if (!link) {
      return res.status(404).send("Short link not found");
    }

   
    res.redirect(301, link.url);
  } catch (err) {
    console.error("[redirect] failed:", err);
    res.status(500).send("Internal server error");
  }
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