import { randomUUID } from "node:crypto";
import type { Request, Response, NextFunction } from "express";

export function sessionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let sid = req.cookies?.sid;

  if (!sid) {
    sid = randomUUID();

    res.cookie("sid", sid, {
      httpOnly: true,
      sameSite: "none", 
      secure: true,   
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    }); 
  }

  (req as any).sid = sid;
  next();
}