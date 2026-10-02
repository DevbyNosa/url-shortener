# nosa.link — URL Shortener

**Built by:** Igbinosa Nosa Judges
**Started:** October 1 2026
**Status:** Planning

---

## What it is

A URL shortener that takes long URLs and returns short, shareable links.

Two goals:
1. **Ship a working product** (fast)
2. **Learn to engineer systems that scale** (deep)

The product is the excuse. The engineering is the point.

---

## Part 1 — MVP (Week 1-2)

The minimum version that works. No accounts. No dashboards. Just paste and go.

### Features

**1. Shorten a URL**
- User pastes a long URL into an input
- Backend generates a short code (6-7 characters)
- Returns the short link: `nosa.link/aB3x9k`
- User can copy the short link

**2. Redirect**
- Visiting `nosa.link/aB3x9k` redirects (HTTP 301) to the original URL
- If code doesn't exist → 404 page
- If code is invalid → 404 page

**3. Recent links**
- Optional: a list showing the last 20 links created
- Just code + URL
- No auth — every visitor sees the same list

**4. URL validation**
- Only `http://` and `https://` schemes allowed
- Reject `javascript:`, `file:`, `data:` schemes
- Max URL length: 2,048 characters

### Not in MVP

- ❌ User accounts
- ❌ Login / signup
- ❌ Custom codes
- ❌ Link expiration
- ❌ Analytics
- ❌ QR codes
- ❌ API keys

### Tech stack

- **Frontend:** React + Vite + TypeScript + Tailwind
- **Backend:** Express + TypeScript
- **Database:** PostgreSQL
- **Deploy:** Vercel (frontend) + Render (backend)

### API endpoints
