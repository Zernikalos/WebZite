import { useState } from "react";
import SectionTitle from "../sections/SectionTitle";
import SectionText from "../sections/SectionText";
import ZkExample from "./ZkExample";

export default function SimpleSampleSection() {
    const [hasError, setHasError] = useState(false);

    // Si hay error, no mostrar nada
    if (hasError) {
        return null;
    }
    return (
        <section className="tw:py-24 tw:w-full">
            <div className="container tw:flex tw:flex-col tw:items-center tw:gap-6">
                {/* Title and Description */}
                <div className="tw:text-center">
                    <SectionTitle title="See It In Action" />
                    <SectionText>
                        The engine seamlessly handles 3D character animations and complex scenes, 
                        delivering the performance and visual fidelity your projects deserve. 
                        Experience the same smooth performance across all platforms, powered by 
                        cutting-edge technologies like <span className="tw:font-semibold">WebGPU</span>.
                    </SectionText>
                </div>

                {/* Interactive Demo */}
                <div className="tw:w-full tw:flex tw:justify-center">
                    <ZkExample onError={() => setHasError(true)} />
                </div>
            </div>
        </section>
    );
}
