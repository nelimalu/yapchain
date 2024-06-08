import React, { useRef, useEffect, useState } from 'react';
import '../clearBG.css';

const Canvas = props => {
  const canvasRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const keysPressed = useRef({});

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw the main character (circle) at the center of the canvas
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fill();

    // Draw other objects relative to the main character
    drawOtherObjects(ctx, offset, centerX, centerY);
  };

  const drawOtherObjects = (ctx, offset, centerX, centerY) => {
    ctx.fillStyle = "#FF0000";

    // Example object
    ctx.beginPath();
    ctx.rect(centerX + 100 - offset.x, centerY + 50 - offset.y, 40, 40);
    ctx.fill();

    ctx.beginPath();
    ctx.rect(centerX + 160 - offset.x, centerY - 50 - offset.y, 40, 40);
    ctx.fill();
    // Add more objects as needed
  };

  const handleKeyDown = (event) => {
    keysPressed.current[event.key] = true;
    updateOffset();
  };

  const handleKeyUp = (event) => {
    keysPressed.current[event.key] = false;
    updateOffset();
  };

  const updateOffset = () => {
    setOffset(prev => {
      let newOffsetX = prev.x;
      let newOffsetY = prev.y;

      if (keysPressed.current['ArrowUp']) {
        newOffsetY -= 5;
      }
      if (keysPressed.current['ArrowDown']) {
        newOffsetY += 5;
      }
      if (keysPressed.current['ArrowLeft']) {
        newOffsetX -= 5;
      }
      if (keysPressed.current['ArrowRight']) {
        newOffsetX += 5;
      }
      if (keysPressed.current['Enter']) {
        console.log()
      }

      return { x: newOffsetX, y: newOffsetY };
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [draw]);

  return <canvas ref={canvasRef} width={800} height={600} {...props} />;
};

export default Canvas;
