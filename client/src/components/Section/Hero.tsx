import ShortenForm from '../Form/ShortenForm.tsx'

export default function HeroSection() {
  return (
    
   <section className="relative mx-auto grid min-h-[calc(100svh-72px)] w-[90%] max-w-6xl grid-cols-1 items-center justify-center gap-10 overflow-hidden py-16 sm:gap-16 sm:py-20 lg:grid-cols-2">


    
     <div className="col-span-1 flex flex-col gap-6 sm:gap-8">

        <p className="text-[14px] font-medium uppercase text-[#6b7a6e] sm:text-[18px]">URL Shortener</p>
        <h1
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          className="flex flex-col text-[clamp(2.75rem,8vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
        >
          <span>Long URLs,</span>
          <span className="text-[#22c55e]">shortened.</span>
        </h1>
        <p className="max-w-xl text-[15px] leading-relaxed text-[#6b7a6e] sm:text-base">
          Paste any URL. Get a short link small enough to fit in a text, a tweet, or printed on a business card. No account needed.
        </p>
      </div>

      
      <div className="col-span-1 w-full">
        <ShortenForm />
      </div>
    </section>
  )
}
