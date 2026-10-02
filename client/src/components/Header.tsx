import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Links", path: "/links" },
  { label: "Docs", path: "/docs" },
];

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-[#1f2921] bg-[#0a0d0b]/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#22c55e] font-display text-[14px] font-bold text-[#0a0d0b]">
            N
          </span>

          <span className="font-display text-[18px] font-semibold tracking-[-0.3px] text-[#ecf0ec]">
            Devby<span className="text-[#22c55e]">Nosa</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[14px] font-medium transition-colors ${
                  active
                    ? "text-[#22c55e]"
                    : "text-[#6b7a6e] hover:text-[#ecf0ec]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/DevbyNosa/url-shortener"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-lg border border-[#1f2921] px-4 py-2 text-[13px] font-medium text-[#6b7a6e] transition-colors hover:border-[#2a3a2e] hover:text-[#ecf0ec] sm:flex"
          >
            GitHub
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1f2921] text-[#ecf0ec] md:hidden cursor-pointer"
            aria-label="Menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}