import { useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions, Engine } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#4DE8E0",
        },
        links: {
          color: "#8B7CFA",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            width: 1000,
            height: 1000,
          },
          value: 60,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles
        id="tsparticles"
        options={options}
        className="absolute inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none"
      />
    </ParticlesProvider>
  );
}
