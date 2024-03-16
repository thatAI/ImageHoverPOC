import React, { useRef, useEffect } from "react";
import { useState } from "react";
const CanvasDrawing = () => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [iconwidthandHeight, setIconWidthandHeight] = useState();
  const draggedImageRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = imageRef.current;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, []);
  const drawIcon = (ctx, icon, x, y) => {
    const image = draggedImageRef.current;
      ctx.drawImage(image, x, y, icon.width, icon.height);
  };

  const handleDragStart = (event, icon) => {
    const draggedImage = event.target;
    draggedImageRef.current = draggedImage;
    setIconWidthandHeight(icon)
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    drawIcon(ctx, iconwidthandHeight, x, y);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid black" }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      />
      <img
        ref={imageRef}
        src="sample.jpg"
        alt="background"
        style={{ display: "none" }}
      />
      <div>
        <img
        alt="img"
        src="logo512.png"
          draggable="true"
          onDragStart={(event) =>
            handleDragStart(event, {
              width: 50,
              height: 50,
            })
          }
          style={{ fontSize: "50px", width: "50px", height: "50px" }}
        />
        <img
        alt="img"
        src="wolgs.png"
          draggable="true"
          onDragStart={(event) =>
            handleDragStart(event, {
              width: 50,
              height: 50,
            })
          }
          style={{ fontSize: "50px", width: "50px", height: "50px" }}
        />
      </div>
    </div>
  );
};

export default CanvasDrawing;
