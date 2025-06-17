import React from 'react';

/**
 * BackgroundBlobs
 * Reusable background blob effect for landing/header sections.
 * Usage: Place as the first child in a relatively/absolutely positioned container.
 */
interface BackgroundBlobsProps {
  children?: React.ReactNode;
}

const BackgroundBlobs: React.FC<BackgroundBlobsProps> = ({ children }) => (
  <div className="tw:relative tw:w-full tw:h-full">
    <div
      aria-hidden="true"
      className="tw:pointer-events-none tw:absolute tw:inset-0 tw:overflow-hidden tw:bg-gradient-to-br tw:from-gray-900 tw:via-gray-950 tw:to-black"
      style={{ zIndex: 0 }}
    >
      {/* Central halo blob */}
      <div
        className="tw:absolute tw:top-1/2 tw:left-1/2 tw:w-[900px] tw:h-[900px] tw:bg-cyan-400/10 tw:blur-[180px] tw:rounded-full tw:translate-x-[-50%] tw:translate-y-[-55%] tw:animate-[pulse_12s_ease-in-out_infinite]"
      ></div>
      {/* Top left blob */}
      <div
        className="tw:absolute tw:-top-40 tw:-left-40 tw:w-[480px] tw:h-[480px] tw:bg-cyan-500/30 tw:blur-[120px] tw:rounded-full tw:animate-[pulse_8s_ease-in-out_infinite]"
      ></div>
      {/* Bottom right blob */}
      <div
        className="tw:absolute tw:bottom-[-100px] tw:right-[-120px] tw:w-[500px] tw:h-[500px] tw:bg-purple-600/25 tw:blur-[140px] tw:rounded-full tw:animate-[pulse_10s_ease-in-out_infinite]"
      ></div>
      {/* Top right blob */}
      <div
        className="tw:absolute tw:-top-32 tw:right-1/4 tw:w-[350px] tw:h-[350px] tw:bg-pink-500/20 tw:blur-[100px] tw:rounded-full tw:animate-[pulse_14s_ease-in-out_infinite]"
      ></div>
      {/* Bottom left blob */}
      <div
        className="tw:absolute tw:bottom-1/4 tw:left-0 tw:w-[320px] tw:h-[320px] tw:bg-blue-500/15 tw:blur-[90px] tw:rounded-full tw:animate-[pulse_16s_ease-in-out_infinite]"
      ></div>
    </div>
    <div className="tw:relative" style={{ zIndex: 1 }}>
      {children}
    </div>
  </div>
);

export default BackgroundBlobs;
