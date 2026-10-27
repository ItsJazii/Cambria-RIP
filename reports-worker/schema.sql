CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  offense TEXT NOT NULL,
  discord TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS reports_ip_created ON reports (ip_hash, created_at);

CREATE TABLE IF NOT EXISTS votes (
  slug TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  vote TEXT NOT NULL CHECK (vote IN ('keep', 'remove')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (slug, ip_hash)
);
