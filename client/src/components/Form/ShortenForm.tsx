import { useState } from "react";

export default function ShortenForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setShortUrl("");
    setCopied(false);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to shorten");
      }

      setShortUrl(data.shortUrl);
      setUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex w-full flex-col gap-5 rounded-md border border-[#1f2921] bg-[#111613] p-6">
     
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[1.5px] text-[#6b7a6e]">
          Shorten a URL
        </p>
        <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
      </div>

      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
       
        <div className="flex items-center gap-3 border border-[#1f2921] bg-[#0a0d0b] px-4 transition-colors focus-within:border-[#22c55e]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0 text-[#6b7a6e]"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>

          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError("");
            }}
            placeholder="Paste your long URL here"
            disabled={loading}
            required
            className="h-[52px] flex-1 rounded-none bg-transparent font-mono text-[13px] text-[#ecf0ec] outline-none placeholder:text-[#3a4340] disabled:opacity-60"
          />
        </div>

      
        <button
          type="submit"
          disabled={loading}
          className="flex h-[52px] cursor-pointer items-center justify-center gap-2 rounded-md bg-[#22c55e] font-sans text-[13px] font-semibold text-[#0a0d0b] transition-colors hover:bg-[#2ee065] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            "Shortening..."
          ) : (
            <>
              Shorten URL
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </form>

    
      <p className="text-center font-mono text-[11px] text-[#3a4340]">
        No account · Instant · Free forever
      </p>

    
      {error && (
        <div className="border border-[#e47d7d]/40 bg-[#e47d7d]/5 px-4 py-3">
          <p className="text-[13px] text-[#e47d7d]">{error}</p>
        </div>
      )}

      
      {shortUrl && (
        <div className="border border-[#22c55e]/35 bg-[#22c55e]/5 p-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
            <p className="font-mono text-[10px] uppercase tracking-[1.4px] text-[#22c55e]">
              Your short link
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="break-all font-display text-[18px] font-semibold text-[#ecf0ec] hover:text-[#22c55e]"
            >
              {shortUrl}
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 cursor-pointer border border-[#22c55e]/40 px-4 py-2 font-sans text-[11px] font-semibold text-[#22c55e] transition-colors hover:bg-[#22c55e]/10"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}