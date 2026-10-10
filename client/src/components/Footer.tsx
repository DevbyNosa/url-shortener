export default function Footer() {
  return (
    <footer className="border-t border-[#1f2921]">
      <div className="mx-auto flex w-[90%] max-w-6xl items-center justify-between gap-4 py-6">
        <p className="font-mono text-[12px] text-[#3a4340] sm:text-[14px]">
          Built by{" "}
          <a
            href="https://devbynosa.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="text-[#6b7a6e] transition-colors hover:text-[#22c55e] "
          >
            DevbyNosa
          </a>
        </p>

       <p className="font-mono text-[12px] text-[#6b7a6e] sm:text-[14px]">
        © {new Date().getFullYear()}
      </p>
      </div>
    </footer>
  );
}