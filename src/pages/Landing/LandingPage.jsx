import { WaitlistModal } from "./components";
import Hero from "./components/Hero";
import { CampusStageSection, FinalCTASection, Footer, Header, ProblemDetailsSection, ProblemSection, StoryConclusionSection, StudentsSection, UniverseSection, WaitlistBanner } from "./sections";
import Gallery from "./sections/Gallery";


const LandingPage = () => {
  return (
    <div className="relative dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* <Header /> */}
      <Hero />
      <WaitlistBanner />
      <ProblemSection />
      <ProblemDetailsSection />
      <StudentsSection />
      <Gallery />
      <CampusStageSection />
      <UniverseSection />
      <StoryConclusionSection />
      <FinalCTASection />
      <Footer />

      <WaitlistModal />
    </div>
  )
}
export default LandingPage;