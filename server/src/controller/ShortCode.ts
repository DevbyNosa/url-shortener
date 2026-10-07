import type { Request, Response } from "express";
import { pool } from "../db.ts";
import { generateShortCode } from "../utils/shortcode.ts";
import {sessionMiddleware} from "../middleware/session.ts";

interface LinkRow {
  id: number;
  code: string;
  url: string;
  session_id: string;
  created_at: Date;
}

interface CreateLinkBody {
  url: string;
}

// POST /api/shorten
export async function shortenUrl(
  req: Request<{}, {}, CreateLinkBody>,
  res: Response
) {
  try {
    const { url } = req.body;
    const sid = req.sid;

    if (!sid) {
      return res.status(500).json({ error: "Session not initialized" });
    }

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "url is required" });
    }

    const code = generateShortCode();

    const { rows } = await pool.query<LinkRow>(
      `INSERT INTO links (code, url, session_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [code, url, sid]
    );

    const link = rows[0];
    if (!link) {
      return res.status(500).json({ error: "Failed to create link" });
    }

    const baseUrl =
      process.env.PUBLIC_BASE_URL || "http://localhost:3000";

    return res.status(201).json({
      code: link.code,
      shortUrl: `${baseUrl}/${link.code}`,
      url: link.url,
      createdAt: link.created_at,
    });
  } catch (err) {
    console.error("[shortenUrl] failed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// GET /api/links — only this session's links
export async function listLinks(req: Request, res: Response) {
  try {
    const sid = req.sid;

    if (!sid) {
      return res.status(500).json({ error: "Session not initialized" });
    }

    const { rows } = await pool.query<LinkRow>(
      `SELECT * FROM links
       WHERE session_id = $1
       ORDER BY created_at DESC
       LIMIT 100`,
      [sid]
    );

    const baseUrl =
      process.env.PUBLIC_BASE_URL || "http://localhost:3000";

    return res.json({
      links: rows.map((row) => ({
        id: row.id,
        code: row.code,
        url: row.url,
        shortUrl: `${baseUrl}/${row.code}`,
        createdAt: row.created_at,
      })),
    });
  } catch (err) {
    console.error("[listLinks] failed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}