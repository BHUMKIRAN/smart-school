import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
import EmergencyBanner from '@/components/layouts/EmergencyBanner';
import NoticeTicker from '@/components/layouts/NoticeTicker';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import BoardSection from '@/components/sections/BoardSection';
import AdministrationSection from '@/components/sections/AdministrationSection';
import GallerySection from '@/components/sections/GallerySection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <EmergencyBanner />
      <Navbar />
      <NoticeTicker />
      <HeroSection />
      <AboutSection />
      <BoardSection />
      <AdministrationSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  );
}
