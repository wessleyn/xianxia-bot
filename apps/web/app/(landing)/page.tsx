import FeaturesSection from "./_components/FeaturesSection";
import HeroSection from "./_components/HeroSection";

export default function HomePage() {
    return (
        <div className="flex min-h-screen flex-col">
            <HeroSection />
            <FeaturesSection />
        </div>
    );
}