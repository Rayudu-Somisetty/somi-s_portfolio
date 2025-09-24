import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import InternshipsSection from '@/components/InternshipsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
import { useTheme } from '@/contexts/ThemeContext';

const Index = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme}`}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <InternshipsSection />
      <CertificationsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
