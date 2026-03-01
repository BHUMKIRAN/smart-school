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
import { ENDPOINTS } from '@/lib/endpoints';
import type { SchoolPageContent } from '@/types';

async function getSchoolPageContent(): Promise<SchoolPageContent> {
  try {
    const res = await fetch(ENDPOINTS.PUBLIC_SCHOOL_PAGE, { cache: 'no-store' });
    if (!res.ok) {
      return { boardMembers: [], adminStaff: [], departments: [], teachers: [] };
    }
    return res.json();
  } catch {
    return { boardMembers: [], adminStaff: [], departments: [], teachers: [] };
  }
}

export default async function Home() {
  const content = await getSchoolPageContent();

  return (
    <main className="min-h-screen bg-background text-foreground dark:bg-gray-800 dark:text-gray-100 transition-colors">
      <EmergencyBanner />
      <Navbar />
      <NoticeTicker />
      <HeroSection />
      <AboutSection />
      <BoardSection boardMembers={content.boardMembers} />
      <AdministrationSection
        adminStaff={content.adminStaff}
        departments={content.departments}
        teachers={content.teachers}
      />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  );
}
