import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FaAndroid, FaApple } from 'react-icons/fa';
import { SiJavascript, SiKotlin } from 'react-icons/si';

/**
 * Displays a solar-system-style composition of platform icons with
 * the Kotlin logo at the centre and the other platforms orbiting it.
 */
type PlanetProps = {
  Icon: React.ComponentType<any>;
  colorClass: string;
  sizeClass: string;
  orbitScale: number; // 0-1 relative to container
  speed: number; // seconds
  label: string;
};

function IconPlanet({ Icon, colorClass, sizeClass, orbitScale, speed }: PlanetProps) {
  // Calculate positioning based on orbitScale
  const offset = (1 - orbitScale) * 50; // percentage
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
        className="tw:absolute tw:rounded-full tw:border tw:border-dashed tw:border-gray-500/40"
        style={{ ...ringStyle }}
      />

      {/* Rotating container using Framer Motion */}
      <motion.div
        className="tw:absolute tw:flex tw:items-center tw:justify-center"
        style={{ ...ringStyle }}
        animate={{ rotate: 360 }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {/* Inner container for counter-rotation to keep icon upright */}
        <motion.div
          style={{ 
            position: 'absolute', 
            left: '50%', 
            top: '0%', // Position icon at the 'top' of the orbit circle
            translateX: '-50%', 
            translateY: '-50%' // Center icon on its own axis
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        >
          <Icon
            className={clsx(colorClass, sizeClass)}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

export default function PlatformSolarSystem(): JSX.Element {
  return (
    <div className="tw:relative tw:w-64 tw:h-64 md:tw:w-72 md:tw:h-72 lg:tw:w-80 lg:tw:h-80">
            {/* Central Kotlin "sun" */}
      <div className="tw:flex tw:items-center tw:justify-center tw:absolute tw:inset-0">
        <SiKotlin className="tw:text-purple-400 tw:text-8xl md:tw:text-9xl" />
      </div>

            {/* Individual planet orbits */}
      <IconPlanet
        Icon={FaAndroid}
        colorClass="tw:text-green-400"
        sizeClass="tw:text-5xl lg:tw:text-6xl"
        orbitScale={0.7}
        speed={20}
        label="Android"
      />
      <IconPlanet
        Icon={FaApple}
        colorClass="tw:text-gray-200"
        sizeClass="tw:text-5xl lg:tw:text-6xl"
        orbitScale={1.0}
        speed={18}
        label="iOS"
      />
      <IconPlanet
        Icon={SiJavascript}
        colorClass="tw:text-yellow-400"
        sizeClass="tw:text-5xl lg:tw:text-6xl"
        orbitScale={1.4}
        speed={19}
        label="Web"
      />
          
        
    </div>
  );
}
