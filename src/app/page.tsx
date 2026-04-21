import Image from "next/image";
import SectionHero from "@/components/home/SectionHero";
import SectionIntro from '@/components/home/SectionIntro';
import SectionAreas from '@/components/home/SectionAreas';
import SectionFooter from '@/components/home/SectionFooter';

export default function HomePage() {
  return (
    <main className="relatve bg-black text-white">

      {/* Background layer */}
      <div className="absolute top-0 left-0 w-full z-0 overflow-hidden">
        <Image
          src="/images/backgrounds/starfield.png"
          alt="Nebula"
          width={4000}
          height={12000}
          unoptimized
          className="
              w-full h-auto object-top sticky top-0 -z-10
          "
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10">
        <SectionHero />
        <SectionIntro />
        <SectionAreas />
        <SectionFooter />
        <div className="h-[4000px]" />
      </div>
      
    </main>
  );
}