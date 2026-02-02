import React from 'react';

interface BackgroundBlobsProps {
  children?: React.ReactNode;
}

/**
 * Animated background blob effect for landing/header sections.
 * Creates a dark gradient background with colorful blurred blobs.
 */
const BackgroundBlobs: React.FC<BackgroundBlobsProps> = ({ children }) => (
  <div className="relative w-full h-full">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black"
      style={{ zIndex: 0 }}
    >
      {/* Central halo blob */}
      <div
        className="absolute top-1/2 left-1/2 w-[900px] h-[900px] bg-cyan-400/10 blur-[180px] rounded-full -translate-x-1/2 -translate-y-[55%] animate-[pulse_12s_ease-in-out_infinite]"
      />
      {/* Top left blob */}
      <div
        className="absolute -top-40 -left-40 w-[480px] h-[480px] bg-cyan-500/30 blur-[120px] rounded-full animate-[pulse_8s_ease-in-out_infinite]"
      />
      {/* Bottom right blob */}
      <div
        className="absolute bottom-[-100px] right-[-120px] w-[500px] h-[500px] bg-purple-600/25 blur-[140px] rounded-full animate-[pulse_10s_ease-in-out_infinite]"
      />
      {/* Top right blob */}
      <div
        className="absolute -top-32 right-1/4 w-[350px] h-[350px] bg-pink-500/20 blur-[100px] rounded-full animate-[pulse_14s_ease-in-out_infinite]"
      />
      {/* Bottom left blob */}
      <div
        className="absolute bottom-1/4 left-0 w-[320px] h-[320px] bg-blue-500/15 blur-[90px] rounded-full animate-[pulse_16s_ease-in-out_infinite]"
      />
    </div>
    <div className="relative" style={{ zIndex: 1 }}>
      {children}
    </div>
  </div>
);

export default BackgroundBlobs;
