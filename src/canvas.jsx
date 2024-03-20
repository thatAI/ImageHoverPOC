import { Button } from "antd";
import React, { useRef, useEffect } from "react";
import { useState } from "react";
const CanvasDrawing = () => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [iconwidthandHeight, setIconWidthandHeight] = useState({
    width: 15,
    height: 15,
  });
  const draggedImageRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [dropPoints, setDropPoints] = useState([]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = imageRef.current;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawCanvas(ctx);
  }, [scale, dropPoints]);

  const drawCanvas = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear canvas
    ctx.drawImage(
      imageRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    // Redraw drop points
    dropPoints.forEach((point) => {
      drawIcon(ctx, point.image, point.x, point.y);
    });
  };
  const drawIcon = (ctx, image, x, y) => {
    ctx.drawImage(
      image,
      x * scale,
      y * scale,
      iconwidthandHeight.width,
      iconwidthandHeight.height
    );
  };

  const handleDragStart = (event, icon) => {
    const draggedImage = event.target;
    draggedImageRef.current = draggedImage;
    setIconWidthandHeight(icon);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    let x = (event.clientX - rect.left) / scale;
    let y = (event.clientY - rect.top) / scale;
    console.log(x, y);
    x= x-4.4;
    y = y-6.1;
    const image = draggedImageRef.current;
    setDropPoints([...dropPoints, { image, x, y }]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleZoomIn = () => {
    setScale(scale * 1.1); // Increase scale by 10%
  };

  const handleZoomOut = () => {
    setScale(scale / 1.1); // Decrease scale by 10%
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}> Drop Location </h1>
      <canvas
        ref={canvasRef}
        width={800 * scale}
        height={400 * scale}
        style={{ border: "1px solid black" }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      />
      <div style={{ display: "flex", flexDirection: "row", gap: "30px" , justifyContent:"center" }}>
        <Button onClick={handleZoomIn}>Zoom In</Button>
        <Button onClick={handleZoomOut}>Zoom Out</Button>
      </div>
      <img
        ref={imageRef}
        src="demoImage.jpg"
        alt="background"
        style={{ display: "none" }}
      />
      <h2>Axis Points </h2>
      <div style={{ display: "flex", flexDirection: "row", gap: "50px" , justifyContent:"center" , paddingBottom:'50px' }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p>AP1</p>
          <img
            alt="img"
            src="/reddot.png"
            draggable="true"
            onDragStart={(event) =>
              handleDragStart(event, {
                width: 15,
                height: 15,
              })
            }
            style={{ cursor: "pointer", width: "15px", height: "15px" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p>AP2</p>
          <img
            alt="img"
            src="/bluedot.png"
            draggable="true"
            onDragStart={(event) =>
              handleDragStart(event, {
                width: 15,
                height: 15,
              })
            }
            style={{ cursor: "pointer", width: "15px", height: "15px" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p>AP3</p>
          <img
            alt="img"
            src="/green dot.jpeg"
            draggable="true"
            onDragStart={(event) =>
              handleDragStart(event, {
                width: 15,
                height: 15,
              })
            }
            style={{ cursor: "pointer", width: "15px", height: "15px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasDrawing;
