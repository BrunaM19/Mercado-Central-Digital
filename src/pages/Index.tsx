
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import UserTypeSelection from "@/components/UserTypeSelection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <UserTypeSelection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
