'use client';

import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FaAndroid, FaApple } from 'react-icons/fa';
import { SiJavascript, SiKotlin } from 'react-icons/si';

type PlanetProps = {
  Icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  sizeClass: string;
  orbitScale: number;
  speed: number;
  label: string;
};

/**
 * Orbiting planet icon component.
 * Renders an icon that orbits around a central point with counter-rotation
 * to keep the icon upright.
 */
function IconPlanet({ Icon, colorClass, sizeClass, orbitScale, speed }: PlanetProps) {
  const offset = (1 - orbitScale) * 50;
  const ringStyle: React.CSSProperties = {
    width: `${orbitScale * 100}%`,
    height: `${orbitScale * 100}%`,
    top: `${offset}%`,
    left: `${offset}%`,
  };

  return (
    <>
      {/* Orbit ring */}
      <div
        className="absolute rounded-full border border-dashed border-gray-500/40"
        style={ringStyle}
      />

      {/* Rotating container */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={ringStyle}
        animate={{ rotate: 360 }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {/* Counter-rotation to keep icon upright */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: '0%',
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
        >
          <Icon className={clsx(colorClass, sizeClass)} />
        </motion.div>
      </motion.div>
    </>
  );
}

/**
 * Solar system visualization of supported platforms.
 * Kotlin logo in the center with Android, iOS, and Web orbiting around it.
 */
export default function PlatformSolarSystem() {
  return (
    <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
      {/* Central Kotlin "sun" */}
      <div className="flex items-center justify-center absolute inset-0">
        <SiKotlin className="text-purple-400 text-8xl md:text-9xl" />
      </div>

      {/* Platform orbits */}
      <IconPlanet
        Icon={FaAndroid}
        colorClass="text-green-400"
        sizeClass="text-5xl lg:text-6xl"
        orbitScale={0.7}
        speed={20}
        label="Android"
      />
      <IconPlanet
        Icon={FaApple}
        colorClass="text-gray-200"
        sizeClass="text-5xl lg:text-6xl"
        orbitScale={1.0}
        speed={18}
        label="iOS"
      />
      <IconPlanet
        Icon={SiJavascript}
        colorClass="text-yellow-400"
        sizeClass="text-5xl lg:text-6xl"
        orbitScale={1.4}
        speed={19}
        label="Web"
      />
    </div>
  );
}
