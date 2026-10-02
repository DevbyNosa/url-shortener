import HeroSection from "../components/Section/Hero";
import RecentlyShortened from "../components/Section/RecentlyShorten";

export default function HomePage() {
  return (
    <>
    <HeroSection />
    <RecentlyShortened links={[]} />
    </>
  )
}