import { Hero } from "@/components/home/hero";
import { CategoryShelf } from "@/components/home/category-shelf";
import { NewDrops } from "@/components/home/new-drops";
import { TrustStrip } from "@/components/home/trust-strip";
import { InstagramCta } from "@/components/home/instagram-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <NewDrops />
      <CategoryShelf />
      <InstagramCta />
    </>
  );
}
