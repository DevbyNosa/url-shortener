import "dotenv/config";
import pg from "pg";
const { Pool } = pg;
// Validate required env vars
const required = ["DB_USER", "DB_PASSWORD", "DB_HOST", "DB_NAME"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length > 0) {
    console.error(` Missing env vars: ${missing.join(", ")}`);
    process.exit(1);
}
export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME,
    ssl: process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
});
pool
    .query("SELECT NOW() AS now")
    .then(({ rows }) => console.log("✅ DB connected:", rows[0].now))
    .catch((err) => {
    console.error(" DB connection failed:", err.message);
    process.exit(1);
});
pool.on("error", (err) => {
    console.error("[db] idle client error:", err);
});
//# sourceMappingURL=db.js.map