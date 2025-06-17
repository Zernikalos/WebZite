import React from 'react';

/**
 * BackgroundBlobs
 * Reusable background blob effect for landing/header sections.
 * Usage: Place as the first child in a relatively/absolutely positioned container.
 */
const BackgroundBlobs: React.FC = () => (
  <div
    aria-hidden="true"
    className="tw:pointer-events-none tw:absolute tw:inset-0 tw:overflow-hidden"
  >
    <div
      className="tw:absolute tw:-top-32 tw:-left-32 tw:w-[450px] tw:h-[450px] tw:bg-cyan-500/20 tw:blur-3xl tw:rounded-full tw:animate-[pulse_8s_ease-in-out_infinite]"
    ></div>
    <div
      className="tw:absolute tw:bottom-0 tw:right-0 tw:w-[450px] tw:h-[450px] tw:bg-purple-600/20 tw:blur-3xl tw:rounded-full tw:animate-[pulse_8s_ease-in-out_infinite]"
    ></div>
  </div>
);

export default BackgroundBlobs;
