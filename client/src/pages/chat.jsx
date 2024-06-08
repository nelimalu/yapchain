import React, { useEffect } from 'react';
import '../clearBG.css';

const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>ChainGame</title>
        <style>
            html {
              margin: 0;
              padding: 0;
              overflow: hidden;
            }

            body {
              margin: 0;
            }

            canvas {
              margin: 0;
              padding: 0;
              height: 100vh
              overflow: hidden;
            }
        </style>
    </head>
    <body>
        <canvas></canvas>
        <script>
            var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;


function Sprite(image, x, y, width, height, src_x, src_y, src_width, src_height) {
  // x, y, width, height is used to resize the image
  // for src things you put the actual size of the image

  this.image = new Image();
  this.image.src = image;
  this.x = x;
  this.y = y;
  this.wx = x;
  this.wy = y;
  this.width = width;
  this.height = height;
  this.src_x = src_x;
  this.src_y = src_y;
  this.src_width = src_width;
  this.src_height = src_height;

  this.draw = function() {
    c.drawImage(this.image, this.src_x, this.src_y, this.src_width, this.src_height, this.x, this.y, this.width, this.height);
  }
}

var pscale = 5;
var velocity = 3;
var background = new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/background.png", 0, -300, 1906, 1058, 0, 0, 1906, 1058);

class Player {

  constructor() {
    this.x = window.innerWidth / 2 - 8 * pscale;
    this.y = window.innerHeight / 2 - 11 * pscale;
    this.width = 16 * pscale;
    this.height = 22 * pscale;
    this.pressed = [false, false, false, false];  // left right up down
    this.playersprites = [
      new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/character/ycSpriteMForward.png", this.x, this.y, this.width, this.height, 0, 0, 16, 22),
      new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/character/ycSpriteMForward1.png", this.x, this.y, this.width, this.height, 0, 0, 16, 22),
      new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/character/ycSpriteMForward2.png", this.x, this.y, this.width, this.height, 0, 0, 16, 22),
      new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/character/ycSpriteMBackward.png", this.x, this.y, this.width, this.height, 0, 0, 16, 22),
      new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/character/ycSpriteMBackward1.png", this.x, this.y, this.width, this.height, 0, 0, 16, 22),
      new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/character/ycSpriteMBackward2.png", this.x, this.y, this.width, this.height, 0, 0, 16, 22),
      new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/character/ycSpriteMLeft.png", this.x, this.y, this.width, this.height, 0, 0, 16, 22),
      new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/character/ycSpriteMLeft1.png", this.x, this.y, this.width, this.height, 0, 0, 16, 22),
      new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/character/ycSpriteMLeft2.png", this.x, this.y, this.width, this.height, 0, 0, 16, 22),
      new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/character/ycSpriteMRight.png", this.x, this.y, this.width, this.height, 0, 0, 16, 22),
      new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/character/ycSpriteMRight1.png", this.x, this.y, this.width, this.height, 0, 0, 16, 22),
      new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/character/ycSpriteMRight2.png", this.x, this.y, this.width, this.height, 0, 0, 16, 22)
    ];
    this.cycle = 0;
    this.lastpress = 0;
  }
    
  draw() {
    if (this.pressed[0]) { // left
      this.playersprites[6 + this.cycle].draw();
      this.lastpress = 6;
    }
    else if (this.pressed[1]) { // right
      this.playersprites[9 + this.cycle].draw();
      this.lastpress = 9;
    }
    else if (this.pressed[2]) { // up
      this.playersprites[3 + this.cycle].draw();
      this.lastpress = 3;
    }
    else if (this.pressed[3]) { // down
      this.playersprites[0 + this.cycle].draw();
      this.lastpress = 0;
    }
    else {
      this.playersprites[this.lastpress].draw();
    }



    if (this.pressed[0]) { // left
      background.x += velocity;
    }
    if (this.pressed[1]) { // right
      background.x -= velocity;

    }
    if (this.pressed[2]) { // up
      background.y += velocity;

    }
    if (this.pressed[3]) { // down
      background.y -= velocity;
    }
  }

}


window.addEventListener("keydown", function(event) {
  if (event.key == "w" || event.key == "ArrowUp") {  // W key
    player.pressed[2] = true;
  }

  if (event.key == "s" || event.key == "ArrowDown") {  // S key
    player.pressed[3] = true;
  }

  if (event.key == "a" || event.key == "ArrowLeft") {  // A key
    player.pressed[0] = true;
  }

  if (event.key == "d" || event.key == "ArrowRight") {  // D key
    player.pressed[1] = true;
  }

    const tryCoords = async () => {
             const response = await fetch('http://localhost:2000/coords', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ x: background.x, y:background.y })
            });

            console.log(response)
        }

  if (event.key == "Enter") {
    tryCoords()
    console.log("hudasioasd")
    console.log(background.x, background.y, "dasdas")
  }
});

window.addEventListener("keyup", function(event) {
    if (event.key == "w" || event.key == "ArrowUp") {
      player.pressed[2] = false;
    }

    if (event.key == "s" || event.key == "ArrowDown") {
      player.pressed[3] = false;
    }

    if (event.key == "a" || event.key == "ArrowLeft") {
      player.pressed[0] = false;
    }

    if (event.key == "d" || event.key == "ArrowRight") {
      player.pressed[1] = false;
    }
});



var player = new Player();
var frame = 0;
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.draw();

  frame++;
  if (frame % 10 == 0) {
    player.cycle++;
    player.cycle %= 3;
  }
  console.log(player.cycle)
  player.draw();

}

animate();
 
        </script>
    </body>
    </html>
`;

function Canvas() {
    return (
        <iframe
            title="HTML Content"
            srcDoc={htmlContent}
            style={{ width: '100vw', height: '100vh', border: 'none' }}
        />
    );
}

export default Canvas;
