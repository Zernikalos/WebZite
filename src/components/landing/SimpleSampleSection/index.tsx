'use client';

import { useState } from 'react';
import SectionTitle from '../sections/SectionTitle';
import SectionText from '../sections/SectionText';
import ZkExample from './ZkExample';

/**
 * Interactive demo section showcasing the Zernikalos engine.
 * Displays an animated 3D model with WebGPU rendering.
 */
export default function SimpleSampleSection() {
  const [hasError, setHasError] = useState(false);

  // If there's an error, don't render the section
  if (hasError) {
    return null;
  }

  return (
    <section className="py-24 w-full">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 flex flex-col items-center gap-6">
        {/* Title and Description */}
        <div className="text-center">
          <SectionTitle title="See It In Action" />
          <SectionText className="max-w-2xl mx-auto">
            The engine seamlessly handles 3D character animations and complex scenes,
            delivering the performance and visual fidelity your projects deserve.
            Experience the same smooth performance across all platforms, powered by
            cutting-edge technologies like <span className="font-semibold">WebGPU</span>.
          </SectionText>
        </div>

        {/* Interactive Demo */}
        <div className="w-full flex justify-center">
          <ZkExample onError={() => setHasError(true)} />
        </div>
      </div>
    </section>
  );
}
