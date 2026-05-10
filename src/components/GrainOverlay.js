import { useEffect, useRef } from "react";

function GrainOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const SIZE = 256;
    canvas.width  = SIZE;
    canvas.height = SIZE;

    const imageData = ctx.createImageData(SIZE, SIZE);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      data[i]     = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 28;
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="grain-canvas"
      aria-hidden="true"
    />
  );
}

export default GrainOverlay;
