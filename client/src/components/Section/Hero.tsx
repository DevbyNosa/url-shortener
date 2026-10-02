import ShortenForm from '../Form/ShortenForm.tsx'

export default function HeroSection() {
  return (
    
    <section className="relative grid grid-cols-2 h-[80vh] w-[90%] mx-auto items-center justify-center overflow-hidden max-w-6xl gap-12">
      
      
      <div className="col-span-1 flex flex-col gap-8">
        <p className="text-[#6b7a6e] text-[18px] uppercase font-medium">URL Shortener</p>
        <h1
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          className="flex flex-col text-[60px] font-semibold leading-none"
        >
          <span>Long URLs,</span>
          <span className="text-[#22c55e]">shortened.</span>
        </h1>
        <p className="text-[#6b7a6e] leading-relaxed">
          Paste any URL. Get a short link small enough to fit in a text, a tweet, or printed on a business card. No account needed.
        </p>
      </div>

      
      <div className="col-span-1 w-full">
        <ShortenForm />
      </div>
    </section>
  )
}
