import { useState, useEffect } from "react";
import HeroSection from "../components/Section/Hero";
import RecentlyShortened from "../components/Section/RecentlyShorten";
import type { Link } from "../types";

export default function HomePage() {
   const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    fetch("/api/links", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setLinks(data.links))
      .catch((err) => console.error("[links] fetch failed:", err));
  }, []);
  return (
    <>
    <HeroSection />
     <RecentlyShortened links={links} />
    </>
  )
}