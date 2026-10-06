
CREATE TABLE links (
  id         BIGSERIAL PRIMARY KEY,
  code       TEXT UNIQUE NOT NULL,
  url        TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_links_code ON links (code);
CREATE INDEX idx_links_created_at ON links (created_at DESC);