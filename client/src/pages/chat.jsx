import React, { Component } from 'react';
import '../clearBG.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.keysPressed = {};
    this.offset = { x: 0, y: 0 };
    this.objectsPositions = [];
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

    // Draw the main character (circle) at the center of the canvas
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fill();

    // Draw other objects relative to the main character
    this.drawOtherObjects(ctx, this.offset, centerX, centerY);
  };

  drawOtherObjects = (ctx, offset, centerX, centerY) => {
    ctx.fillStyle = '#FF0000';

    // Example object 1
    const object1 = {
      x: centerX + 100 - offset.x,
      y: centerY + 50 - offset.y,
      width: 40,
      height: 40,
    };
    ctx.beginPath();
    ctx.rect(object1.x, object1.y, object1.width, object1.height);
    ctx.fill();

    // Example object 2
    const object2 = {
      x: centerX + 160 - offset.x,
      y: centerY - 50 - offset.y,
      width: 40,
      height: 40,
    };
    ctx.beginPath();
    ctx.rect(object2.x, object2.y, object2.width, object2.height);
    ctx.fill();

    // Store positions
    this.objectsPositions = [object1, object2];
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
    this.setState(prevState => {
    let newOffsetX = prevState ? prevState.offset.x : 0;
    let newOffsetY = prevState ? prevState.offset.y : 0;

      if (this.keysPressed['ArrowUp']) {
        console.log("iojpadsijdsaijoasdoijadsoij")
        newOffsetY -= 5;
      }
      if (this.keysPressed['ArrowDown']) {
        newOffsetY += 5;
      }
      if (this.keysPressed['ArrowLeft']) {
        newOffsetX -= 5;
      }
      if (this.keysPressed['ArrowRight']) {
        newOffsetX += 5;
      }
      if (this.keysPressed['Enter']) {
        console.log(this.objectsPositions);
      }

      return { offset: { x: newOffsetX, y: newOffsetY } };
    });
  };

  render() {
    return (
      <>
        <canvas ref={this.canvasRef} width={800} height={600} {...this.props} />
        <div className="rounded-full">
          <div className="hi"> </div>
        </div>
      </>
    );
  }
}

export default Canvas;
