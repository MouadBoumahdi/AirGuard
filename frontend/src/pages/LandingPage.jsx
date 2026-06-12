import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import PrecisionSection from '../components/PrecisionSection';
import StewardshipSection from '../components/StewardshipSection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col antialiased">
      <Header />
      <HeroSection />
      <PrecisionSection />
      <StewardshipSection />
      <Footer />
    </div>
  );
}
