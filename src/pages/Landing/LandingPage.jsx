import { WaitlistModal } from "./components";
import { CampusStageSection, FinalCTASection, Footer, Header, Hero, ProblemDetailsSection, ProblemSection, StoryConclusionSection, StudentsSection, UniverseSection, WaitlistBanner } from "./sections";


const LandingPage = () => {
  return (
    <div className="relative dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <Header />
        <Hero />
        <WaitlistBanner />
        <ProblemSection  />
        <ProblemDetailsSection />
        <StudentsSection />
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