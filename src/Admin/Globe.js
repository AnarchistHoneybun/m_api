import createGlobe from "cobe";
import { useEffect, useRef } from "react";

function getRandomColor() {
  // Generate three random numbers between 0 and 1
  const r = Math.random();
  const g = Math.random();
  const b = Math.random();

  return [r, g, b];
}

function Globe() {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0.1,
      theta: 0.4,
      dark: 1,
      diffuse: 2,
      mapSamples: 25000,
      opacity: 0.4,
      mapBrightness: 6,
      baseColor: [0.23, 0.25, 0.29],
      markerColor: [0.14, 0.58, 0.26],
      glowColor: [0.41, 0.46, 0.52],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [-21.249020,165.209832], size: 0.01 },
        { location: [25.323008,83.035065], size: 0.04 },
        { location: [37.112766,103.912428], size: 0.1 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [32.392391, 75.510246], size: 0.03 }
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      }
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
    />
  );
}

export default Globe;