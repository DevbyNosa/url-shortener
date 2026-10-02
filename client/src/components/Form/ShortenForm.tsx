export default function ShortenForm() {
  return (
    <div className="flex w-full flex-col gap-5 border border-[#1f2921] bg-[#111613] p-6 rounded-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[1.5px] text-[#6b7a6e]">
          Shorten a URL
        </p>
       
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-3"
      >
        {/* Input */}
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
            placeholder="Paste your long URL here"
            className="h-[52px] flex-1 bg-transparent font-mono text-[13px] text-[#6b7a6e] outline-none placeholder:text-[#3a4340] rounded-md"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="flex h-[52px] cursor-pointer items-center justify-center gap-2 bg-[#22c55e] font-sans text-[13px] font-semibold text-[#0a0d0b] transition-colors hover:bg-[#2ee065] rounded-md"
        >
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
        </button>
      </form>

      {/* Hint */}
      <p className="text-center font-mono text-[11px] text-[#3a4340]">
        No account · Instant · Free forever
      </p>
    </div>
  );
}