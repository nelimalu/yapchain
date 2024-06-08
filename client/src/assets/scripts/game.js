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

var speechscale = 4;
var pscale = 5;
var velocity = 3;
var background = new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/background.png", -80, -400, 1906 * 4, 1058 * 4, 0, 0, 1906, 1058);
var speechSprites = [
  ["https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/smallbox.png", -110, -75, 75 * speechscale, 18 * speechscale, 0, 0, 75, 18],
  ["https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/mediumbox.png", -210, -75, 125 * speechscale, 18 * speechscale, 0, 0, 125, 18],
  ["https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/largebox.png", -310, -75, 175 * speechscale, 18 * speechscale, 0, 0, 175, 18]
];

class SpeechBubble {

  constructor(text, x, y) {
    this.text = text;
    if (this.text.length > 75)
      this.text = this.text.substring(0, 75) + "...";
    this.x = x;
    this.y = y;
    this.sprite = new Sprite(...speechSprites[this.getSize()]);
    this.sprite.x += this.x;
    this.sprite.y += this.y;
    this.sprite.wx *= 2.5;
    this.sprite.wy *= 2.5;
  }

  getSize() {
    if (this.text.length > 55)
      return 2;
    if (this.text.length > 30)
      return 1;
    return 0;
  }

  draw() {
    this.sprite.draw();
    c.font = "16px Trebuchet MS";
    c.textAlign = 'center';
    c.fillStyle = 'black'
    c.fillText(this.text, this.x + 40, this.y - 46);
  }

}


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
    this.prevdir = 0;
    this.message = undefined;
  }

  draw() {
    if (this.pressed[0]) { // left
      this.playersprites[6 + this.cycle].draw();
      this.prevdir = 6;
    }
    else if (this.pressed[1]) { // right
      this.playersprites[9 + this.cycle].draw();
      this.prevdir = 9;
    }
    else if (this.pressed[2]) { // up
      this.playersprites[3 + this.cycle].draw();
      this.prevdir = 3;
    }
    else if (this.pressed[3]) { // down
      this.playersprites[0 + this.cycle].draw();
      this.prevdir = 0;
    }
    else {
      this.playersprites[this.prevdir].draw();
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

  speak(text) {
    this.message = new SpeechBubble(text, this.x, this.y);
    this.message.draw();
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
  player.draw();

  player.speak("fuck you")
}

animate();
