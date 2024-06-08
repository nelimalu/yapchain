import React, { Component } from 'react';
import '../clearBG.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.keysPressed = {};
    this.state = {
      playerPosition: { x: 400, y: 300 }, // Initial player position at the center
      objectsPositions: [
        { x: 500, y: 350, width: 40, height: 40 },
        { x: 560, y: 250, width: 40, height: 40 }
      ]
    };
  }

  componentDidMount() {
    this.renderCanvas();
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    cancelAnimationFrame(this.animationFrameId);
  }

  renderCanvas = () => {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    let frameCount = 0;

    const render = () => {
      frameCount++;
      this.draw(context, frameCount);
      this.animationFrameId = requestAnimationFrame(render);
    };

    render();
  };

  draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const { playerPosition, objectsPositions } = this.state;

    var imageObj1 = new Image();
    imageObj1.src = 'https://s-media-cache-ak0.pinimg.com/236x/d7/b3/cf/d7b3cfe04c2dc44400547ea6ef94ba35.jpg'
 imageObj1.onload = function() {
        ctx.drawImage(imageObj1,0,0, 500, 500);
 }
    // Calculate the center of the canvas
    const canvasCenterX = ctx.canvas.width / 2;
    const canvasCenterY = ctx.canvas.height / 2;

    // Draw the main character (circle) at the center of the canvas
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(canvasCenterX, canvasCenterY, 20, 0, 2 * Math.PI);
    ctx.fill();

    // Draw other objects relative to the main character
    this.drawOtherObjects(ctx, objectsPositions, playerPosition, canvasCenterX, canvasCenterY);
  };

  drawOtherObjects = (ctx, objectsPositions, playerPosition, canvasCenterX, canvasCenterY) => {
    ctx.fillStyle = '#FF0000';

    objectsPositions.forEach((obj) => {
      ctx.beginPath();
      ctx.rect(canvasCenterX + obj.x - playerPosition.x, canvasCenterY + obj.y - playerPosition.y, obj.width, obj.height);
      ctx.fill();
    });
  };

  handleKeyDown = (event) => {
    this.keysPressed[event.key] = true;
    this.updateOffset();
  };

  handleKeyUp = (event) => {
    this.keysPressed[event.key] = false;
    this.updateOffset();
  };

  updateOffset = () => {
    let { playerPosition } = this.state;
    let newOffsetX = 0;
    let newOffsetY = 0;

    if (this.keysPressed['ArrowUp']) {
      newOffsetY = -5;
    }
    if (this.keysPressed['ArrowDown']) {
      newOffsetY = 5;
    }
    if (this.keysPressed['ArrowLeft']) {
      newOffsetX = -5;
    }
    if (this.keysPressed['ArrowRight']) {
      newOffsetX = 5;
    }

    this.setState(prevState => ({
      playerPosition: {
        x: prevState.playerPosition.x + newOffsetX,
        y: prevState.playerPosition.y + newOffsetY
      }
    }), () => {
      if (this.keysPressed['Enter']) {
        this.logPositions();
      }
    });
  };

  logPositions = () => {
    const { playerPosition, objectsPositions } = this.state;
    console.log("Player Position:", playerPosition);
    console.log("Objects Positions:", objectsPositions);
  };

  render() {
    return (
      <>
        <canvas ref={this.canvasRef} width={800} height={600} {...this.props} />
      </>
    );
  }
}

export default Canvas;
