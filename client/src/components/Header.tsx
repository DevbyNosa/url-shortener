import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Links", path: "/links" },
  { label: "Docs", path: "/docs" },
];

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1f2921] bg-[#0a0d0b]/95 backdrop-blur-md md:bg-[#0a0d0b]/85">
      <div className="relative mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#22c55e] font-display text-[14px] font-bold text-[#0a0d0b]">
            U
          </span>

          <span className="font-display text-[18px] font-semibold tracking-[-0.3px] text-[#ecf0ec]">
           Url<span className="text-[#22c55e]">Short</span>
          </span>
        </Link>

        {/* Nav */}
        <nav
          id="primary-navigation"
          className={`${menuOpen ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col gap-1 border-b border-[#1f2921] bg-[#0a0d0b] px-4 py-3 shadow-xl sm:px-6 md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {navLinks.map((link) => {
            const active = pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`rounded-md px-3 py-3 text-[14px] font-medium transition-colors md:px-0 md:py-2 ${
                  active
                    ? "text-[#22c55e]"
                    : "text-[#6b7a6e] hover:text-[#ecf0ec]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://github.com/DevbyNosa/url-shortener"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 rounded-md px-3 py-3 text-[14px] font-medium text-[#6b7a6e] transition-colors hover:text-[#ecf0ec] md:hidden"
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
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#1f2921] text-[#ecf0ec] transition-colors hover:border-[#2a3a2e] md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {menuOpen ? (
                <path d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}