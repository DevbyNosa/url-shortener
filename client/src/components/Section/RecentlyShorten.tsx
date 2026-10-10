import type { Link } from "../../types";

interface RecentlyShortenedProps {
  links: Link[];
}

export default function RecentlyShortened({ links }: RecentlyShortenedProps) {
  if (links.length === 0) {
    return (
      <section className="mx-auto w-[90%] max-w-6xl py-12 sm:py-20">
        <div className="border border-[#1f2921] bg-[#111613] px-5 py-10 text-center sm:p-12">
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
    <section className="mx-auto w-[90%] max-w-6xl py-12 sm:py-20">
      <div className="mb-8 flex items-end justify-between gap-4 border-b border-[#1f2921] pb-6">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[11px] uppercase tracking-[1.5px] text-[#6b7a6e]">
            Activity
          </p>
          <h2 className="font-display text-[clamp(1.25rem,5vw,1.75rem)] font-semibold tracking-[-1px] text-[#ecf0ec]">
            Recently shortened
          </h2>
        </div>

        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[1px] text-[#3a4340] sm:text-[11px] sm:tracking-[1.2px]">
          {String(links.length).padStart(2, "0")} total
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {links.map((link, index) => (
          <div
            key={link.code}
            className="group grid grid-cols-[24px_minmax(0,1fr)_36px] items-center gap-3 border border-[#1f2921] bg-[#111613] px-3 py-4 transition-colors hover:border-[#22c55e]/35 hover:bg-[#141a17] sm:grid-cols-[40px_minmax(0,1fr)_1fr_auto] sm:gap-4 sm:px-5 sm:py-5 lg:gap-6 lg:px-6"
          >
            <span className="font-mono text-[11px] text-[#3a4340] sm:text-[12px]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <a
              href={link.shortUrl}
              target="_blank"
              rel="noreferrer"
              className="truncate font-mono text-[12px] font-medium text-[#22c55e] hover:underline sm:text-[14px]"
            >
              /{link.code}
            </a>

            <span className="hidden min-w-0 truncate text-[12px] text-[#6b7a6e] sm:block">
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