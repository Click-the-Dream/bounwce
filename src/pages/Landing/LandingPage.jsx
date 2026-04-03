import { WaitlistModal } from "./components";
import AboutSection from "./components/AboutSection";
import ExploreSection from "./components/ExploreSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";


const LandingPage = () => {
  return (
    <div className="relative dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* <Header /> */}
      <Hero />
      <AboutSection />
      <ExploreSection />
      <Footer />
    </div>
  )
}
export default LandingPage;