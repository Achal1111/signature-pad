import React, { useState, useRef } from "react";
import "./SignaturePad.css"; // Import your CSS file for styling

const SignaturePad: React.FC = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const { offsetX, offsetY } = event.nativeEvent;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="signature-pad-container">
      <canvas
        ref={canvasRef}
        className="signature-canvas"
        width={400}
        height={200}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
      />
      <div className="button-container">
        <button className="clear-button" onClick={clearCanvas}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
