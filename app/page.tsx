import AboutPreview from '@/components/home/AboutPreview';
import Banner from './home/Banner';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import HomeCoursesSection from '@/components/home/HomeCoursesSection';
import TestimonialSection from '@/components/home/TestimonialSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Banner />
      <AboutPreview></AboutPreview>
      <WhyChooseUs></WhyChooseUs>
      <HomeCoursesSection></HomeCoursesSection>
      <TestimonialSection></TestimonialSection>
    </main>
  );
}
