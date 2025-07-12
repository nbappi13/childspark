import AboutPreview from '@/components/home/AboutPreview';
import Banner from './home/Banner';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Banner />
      <AboutPreview></AboutPreview>
    </main>
  );
}
