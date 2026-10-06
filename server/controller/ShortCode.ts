import type { Request, Response } from "express";
import { pool } from "../src/db.ts";
import { generateShortCode } from "../utils/shortCode.ts";

interface LinkRow {
  id: number;
  code: string;
  url: string;
  created_at: Date;
}

export default async function shortenUrl(req: Request, res: Response) {
  try {
    
    const { url } = req.body;

    if (!url || typeof url !== "string") {
      return res.status(400).json({
        success: false,
        message: "url is required",
      });
    }

    
    const code = generateShortCode();

    
    const { rows } = await pool.query<LinkRow>(
      `INSERT INTO links (code, url) VALUES ($1, $2) RETURNING *`,
      [code, url]
    );

    const link = rows[0];

    if (!link) {
      return res.status(500).json({
        success: false,
        message: "Failed to create link",
      });
    }

   
    const baseUrl = process.env.PUBLIC_BASE_URL || "http://localhost:5173";
    const shortUrl = `${baseUrl}/${link.code}`;

    
    return res.status(201).json({
      code: link.code,
      shortUrl,
      url: link.url,
    });
  } catch (error) {
    
    console.error("[shortenUrl] failed:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}