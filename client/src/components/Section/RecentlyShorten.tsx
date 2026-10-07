import type { Link } from "../../types";

interface RecentlyShortenedProps {
  links: Link[];
}

export default function RecentlyShortened({ links }: RecentlyShortenedProps) {
  if (links.length === 0) {
    return (
      <section className="mx-auto w-[90%] max-w-6xl py-20">
        <div className="border border-[#1f2921] bg-[#111613] p-12 text-center">
          <p className="mt-4 font-display text-[18px] font-medium text-[#6b7a6e]">
            No links yet
          </p>
          <p className="mt-2 font-mono text-[11px] text-[#3a4340]">
            Shorten your first URL to see it here
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-[90%] max-w-6xl py-20">
      <div className="mb-8 flex items-end justify-between border-b border-[#1f2921] pb-6">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[11px] uppercase tracking-[1.5px] text-[#6b7a6e]">
            Activity
          </p>
          <h2 className="font-display text-[28px] font-semibold tracking-[-1px] text-[#ecf0ec]">
            Recently shortened
          </h2>
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[1.2px] text-[#3a4340]">
          {String(links.length).padStart(2, "0")} total
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {links.map((link, index) => (
          <div
            key={link.code}
            className="group grid grid-cols-[40px_1fr_auto] items-center gap-6 border border-[#1f2921] bg-[#111613] px-6 py-5 transition-colors hover:border-[#22c55e]/35 hover:bg-[#141a17] md:grid-cols-[40px_1fr_1fr_auto]"
          >
            <span className="font-mono text-[12px] text-[#3a4340]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <a
              href={link.shortUrl}
              target="_blank"
              rel="noreferrer"
              className="truncate font-mono text-[14px] font-medium text-[#22c55e] hover:underline"
            >
              /{link.code}
            </a>

            <span className="hidden truncate text-[13px] text-[#6b7a6e] md:block">
              {link.url}
            </span>

            <a
              href={link.shortUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open link"
              className="flex h-9 w-9 items-center justify-center border border-[#1f2921] text-[#6b7a6e] transition-colors group-hover:border-[#22c55e]/40 group-hover:text-[#22c55e]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}