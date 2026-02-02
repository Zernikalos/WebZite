import BackgroundBlobs from '@/components/landing/BackgroundBlobs';
import LandingHeader from '@/components/landing/Header';
import MultiplatformSection from '@/components/landing/sections/Multiplatform';
import BlazingFastSection from '@/components/landing/sections/BlazingFast';
import SimpleSampleSection from '@/components/landing/SimpleSampleSection';
import PoweredByKotlinSection from '@/components/landing/sections/PoweredByKotlin';

export default function HomePage() {
  return (
    <BackgroundBlobs>
      {/* WIP Banner */}
      <div className="bg-amber-500/20 border-b border-amber-500/50 py-2 text-center text-amber-200">
        <span>
          🚧 This project is still in early stages of development, not suitable for production 🚧
        </span>
      </div>

      {/* Header */}
      <LandingHeader />

      {/* Main Content */}
      <main>
        <MultiplatformSection />
        <BlazingFastSection />
        <SimpleSampleSection />
        <PoweredByKotlinSection />
      </main>
    </BackgroundBlobs>
  );
}
