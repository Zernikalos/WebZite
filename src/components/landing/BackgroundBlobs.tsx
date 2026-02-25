import React from 'react';

interface BackgroundBlobsProps {
  children?: React.ReactNode;
}

/**
 * Animated background blob effect for landing/header sections.
 * Creates a themed gradient background with colorful blurred blobs.
 */
const BackgroundBlobs: React.FC<BackgroundBlobsProps> = ({ children }) => (
  <div className="relative w-full h-full">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-sky-100/80 dark:from-gray-900 dark:via-gray-950 dark:to-black"
      style={{ zIndex: 0 }}
    >
      {/* Light-mode soft veil to avoid pure-white glare */}
      <div className="absolute inset-0 bg-white/35 dark:hidden" />

      {/* Central halo blob */}
      <div
        className="absolute top-1/2 left-1/2 w-[900px] h-[900px] rounded-full -translate-x-1/2 -translate-y-[55%] blur-[180px] animate-[pulse_12s_ease-in-out_infinite] bg-cyan-400/8 dark:bg-cyan-400/10"
      />
      {/* Top left blob */}
      <div
        className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite] bg-cyan-400/14 dark:bg-cyan-500/30"
      />
      {/* Bottom right blob */}
      <div
        className="absolute bottom-[-100px] right-[-120px] w-[500px] h-[500px] rounded-full blur-[140px] animate-[pulse_10s_ease-in-out_infinite] bg-violet-400/12 dark:bg-purple-600/25"
      />
      {/* Top right blob */}
      <div
        className="absolute -top-32 right-1/4 w-[350px] h-[350px] rounded-full blur-[100px] animate-[pulse_14s_ease-in-out_infinite] bg-pink-400/10 dark:bg-pink-500/20"
      />
      {/* Bottom left blob */}
      <div
        className="absolute bottom-1/4 left-0 w-[320px] h-[320px] rounded-full blur-[90px] animate-[pulse_16s_ease-in-out_infinite] bg-blue-400/8 dark:bg-blue-500/15"
      />
    </div>
    <div className="relative" style={{ zIndex: 1 }}>
      {children}
    </div>
  </div>
);

export default BackgroundBlobs;
