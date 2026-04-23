import { Navbar } from '@/components/layout/Navbar';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
    </>
  );
}
