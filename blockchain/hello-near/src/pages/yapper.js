import React, { useState, useEffect, useContext } from 'react';
import { NearContext } from '@/context';
import { HelloNearContract } from '../config';

const CONTRACT = HelloNearContract;

export default function Yapper() {
  const [iframeKey, setIframeKey] = useState(0);
  const { signedAccountId, wallet } = useContext(NearContext);

  const [greeting, setGreeting] = useState('[]');
  const [newGreeting, setNewGreeting] = useState('[]');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const [message, setMessage] = useState("")

  const getGreeting = async () => {
    if (!wallet) return;

    await wallet.viewMethod({ contractId: CONTRACT, method: 'get_greeting' }).then(
      greeting => setGreeting(greeting)
    ).then(
      //console.log(greeting)
    )
  };

  const saveGreeting = async () => {
    setShowSpinner(true);
    await wallet.callMethod({ contractId: CONTRACT, method: 'set_greeting', args: { greeting: newGreeting, time: Date.now() } });
    const greeting = await wallet.viewMethod({ contractId: CONTRACT, method: 'get_greeting' });
    setGreeting(greeting);
    setShowSpinner(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIframeKey(prevKey => prevKey + 1);
    }, 1);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    setInterval(() => {
      getGreeting();
    }, 100);
  }, []);

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
              width: 100vw;
              height: 100vh;
            }
            body {
              margin: 0;
              width: 100vw;
              height: 100vh;
            }
            canvas {
              margin: 0;
              padding: 0;
              height: 100vh;
              width: 100vw;
              overflow: hidden;
            }
        </style>
    </head>
    <body>
        <audio id="music">
          <source src="https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/audio/route202.mp3" type="audio/mpeg">
        </audio>
        <audio id="steps" loop>
          <source src="https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/audio/footsteps.mp3" type="audio/mpeg">
        </audio>
        <canvas width="1000" height="1000"></canvas>
    <script>
      var canvas = document.querySelector('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var water=1;

      var c = canvas.getContext('2d');
      var players = {};
      var bubbles = [];
      c.imageSmoothingEnabled = false;
      const keys = new Set();
      var wasd = 0; 
      function isInBounds(px, py) {
        
        for(let i = 0; i < rectangles.length; i++) {
          let len = rectangles[i][2];
          let height = rectangles[i][3];

           // if the length > height, then N or S -----------
          if (len>height) { //horizontal
            // console.log("1");
            if((Math.abs(py - rectangles[i][1]) <= 2) || (Math.abs(py+60 - rectangles[i][1]) <= 2)){
              if (px <= rectangles[i][0]+ len && px+80 >= rectangles[i][0] ){ 
                //then you CANT PASS
              

                return false;
              }
            }

          } else if (height > len) {
            //then going E/W 
            if ((Math.abs(px -rectangles[i][0] ) <= 2) || (Math.abs(px+80 - rectangles[i][0] )) <= 2) {
              if(py+60 >= rectangles[i][1] && py <= rectangles[i][1]+height) {
                return false;
              }
            }
            

          }
          } 
          //returns true ONLY if the person is not 10 pixels within a boundary
        
        return true; 
        }

      function Sprite(image, x, y, width, height, src_x, src_y, src_width, src_height) {
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
      var music = document.getElementById("music");
      var steps = document.getElementById("steps");
      var pscale = 5;
      var velocity = 3;
      var background = new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/background1.png", -80, -400, 1906*4, 1058*4, 0, 0, 1906, 1058);
      var foreground = new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/foreground1.png", -80, -400, 1906 * 4, 1058 * 4, 0, 0, 1906, 1058);
      var water1 = new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/water1.png", -80, -400, 1906 * 4, 1058 * 4, 0, 0, 1906, 1058);
      var water2 = new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/water2.png", -80, -400, 1906 * 4, 1058 * 4, 0, 0, 1906, 1058);
      var water3 = new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/water3.png", -80, -400, 1906 * 4, 1058 * 4, 0, 0, 1906, 1058);

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
          c.fillStyle = 'black';
          c.fillText(this.text, this.x + 40, this.y - 46);
        }

      }

      var playerlocation = {
        x: 0,
        y: 0
      }

      class Player {
        constructor() {
          this.x = window.innerWidth / 2 - 8 * pscale;
          this.y = window.innerHeight / 2 - 11 * pscale;
          this.direction = "down-idle";
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
          this.message = undefined;

        }
        fixSprite(index) {
          this.playersprites[index].x = window.innerWidth / 2 - 8 * pscale;
          this.playersprites[index].y = window.innerHeight / 2 - 11 * pscale;
        }

        draw() {
          if (this.pressed[0]) { // left
            this.fixSprite(6 + this.cycle);
            this.playersprites[6 + this.cycle].draw();
            this.lastpress = 6;
          }
          else if (this.pressed[1]) { // right
            this.fixSprite(9 + this.cycle);
            this.playersprites[9 + this.cycle].draw();
            this.lastpress = 9;
          }
          else if (this.pressed[2]) { // up
            this.fixSprite(3 + this.cycle);
            this.playersprites[3 + this.cycle].draw();
            this.lastpress = 3;
          }
          else if (this.pressed[3]) { // down
            this.fixSprite(this.cycle);
            this.playersprites[0 + this.cycle].draw();
            this.lastpress = 0;
          }
          else {
            this.fixSprite(this.lastpress);
            this.playersprites[this.lastpress].draw();
          }

          //check if the boy touches a side
          //if the side plus it's pixel velocity (rectangles[i][0]) meets the feet of the
          // console.log("good");


          if (this.pressed[0]&&isInBounds(player.x-4, player.y)) { // left
            background.x += velocity;
            foreground.x += velocity;
            water1.x += velocity;
            water2.x += velocity;
            water3.x += velocity;
            for (let i = 0; i < rectangles.length; i++) {
              rectangles[i][0]+=velocity;
            }
          } 
          if (this.pressed[1]&&isInBounds(player.x+4, player.y)) { // right
            background.x -= velocity;
            foreground.x -= velocity;
            water1.x -= velocity;
            water2.x -= velocity;
            water3.x -= velocity;
            for (let i = 0; i < rectangles.length; i++) {
              rectangles[i][0]-=velocity;
            }
          }
          if (this.pressed[2]&&isInBounds(player.x, player.y-4)) { // up
            background.y += velocity;
            foreground.y += velocity;
            water1.y += velocity;
            water2.y += velocity;
            water3.y += velocity;
            for (let i = 0; i < rectangles.length; i++) {
              rectangles[i][1]+=velocity;
            }
          }
          if (this.pressed[3]&&isInBounds(player.x, player.y+20)) { // down
            background.y -= velocity;
            foreground.y -= velocity;
            water1.y -= velocity;
            water2.y -= velocity;
            water3.y -= velocity;
            for (let i = 0; i < rectangles.length; i++) {
              rectangles[i][1]-=velocity;
            }
          }
        }

        speak(text) {
          this.message = new SpeechBubble(text, this.x, this.y);
          this.message.draw();
        }
      }

      window.onload = function() {
        music.volume = 0.5;
        music.play();
        const tryCoords = async () => {
           const response = await fetch('http://yapper.adaptable.app/coords', {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: "${signedAccountId}", x: playerlocation.x, y: playerlocation.y, direction:player.direction })
          });
          response.json().then(res => {
            players = res;
          });
        }
        setInterval(function() {
          tryCoords();
        },1);

        setInterval(function() {

          if (player.pressed[0]) { // left
            playerlocation.x -= velocity;
          }
          if (player.pressed[1]) { // right
            playerlocation.x += velocity;
          }
          if (player.pressed[2]) { // up
            playerlocation.y -= velocity;
          }
          if (player.pressed[3]) { // down
            playerlocation.y += velocity;
          }
        }, 1);

        setInterval(function() {
          bubbles = [];
          let message_data = JSON.parse('${greeting}');
          //console.log(message_data)
          for (let message of message_data) {
            if (Date.now() - message.timestamp < 10000) {  // THIS IS IMPORATNT NUMBER 10 SECOND LIFESPAN
              console.log("YESSSSSSSS")
              Object.keys(players).forEach(function(key) {
                if (key == message.user) {
                  bubbles.push(new SpeechBubble(message.content, players[key].x, players[key].y));
                }
              });
              console.log(bubbles)

            }
          }
        }, 100);
      };

      window.addEventListener("keydown", function(event) {
        if (event.key == "w" || event.key == "ArrowUp") {  // W key
          player.direction = "up-moving"
          player.pressed[2] = true;
          keys.add(event.key);
        }
        if (event.key == "s" || event.key == "ArrowDown") {  // S key
          player.pressed[3] = true;
          player.direction = "down-moving"
          keys.add(event.key);
        }
        if (event.key == "a" || event.key == "ArrowLeft") {  // A key
          player.direction = "left-moving"
          player.pressed[0] = true;
          keys.add(event.key);
        }
        if (event.key == "d" || event.key == "ArrowRight") {  // D key
          player.direction = "right-moving"
          player.pressed[1] = true;
          keys.add(event.key);
        }
      });

      window.addEventListener("keyup", function(event) {
        if (event.key == "w" || event.key == "ArrowUp") {
          player.direction = "up-idle"
          player.pressed[2] = false;
          keys.delete(event.key);
        }
        if (event.key == "s" || event.key == "ArrowDown") {
          player.direction = "down-idle"
          player.pressed[3] = false;
          keys.delete(event.key);
        }
        if (event.key == "a" || event.key == "ArrowLeft") {
          player.direction = "left-idle"
          player.pressed[0] = false;
          keys.delete(event.key);
        }
        if (event.key == "d" || event.key == "ArrowRight") {
          player.direction = "right-idle"
          player.pressed[1] = false;
          keys.delete(event.key);
        }
      });

      var rectangles = [
        //[x, y, len, height]
        [-40, 20, 350,10],
        [300, 20, 10,140], 
        [-35, 20, 10, 600],
        [-35, 610, 1350, 10],
        [1300, 360, 10, 250],
        [1300, 345, 10, 250],
        [1300, 345, 110, 10],
        [1400, 360, 10, 170],  
        [1400, 460, 300, 10],
        [1700, 350, 10, 110],
        [1700, 350, 150, 10],
        [1470, 110, 220, 70],
        [1470, 110, 10, 120],
        [1690, 110, 10, 120],
        [1820, -300, 10, 800],
        [1100, -260, 860, 10],
        [940, -330, 10, 80], //small arm thing
        [940, -260, 1000, 10],
        [1580, -260, 10, 220], //bar
        [1650, -260, 10, 230], //bar
        [1580, -30, 70, 10],
        [1460, -260, 10, 110],
        [1260, -260, 10, 110],
        [1260, -155, 200, 10],
        [300, 150, 600, 10],
        [900, 10, 10, 150],
        [320, -330, 620, 10], //pool
        [320, -330, 10, 340], //pool
        [320, 0, 590, 10], //pool
        [1080, 320, 10, 270],//billiards
        [1210, 320, 10, 270],//billiards
        [1080, 320, 130, 10],//billiards
        [850, 515, 10, 100],//billiards
        [1000, 515, 10, 100],//billiards
        [850, 515, 150, 10],//billiards

      ];

      var player = new Player();
      var frame = 0;

      function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight);
        c.fillStyle = "black";
        c.fillRect(0, 0, canvas.width, canvas.height);
        background.draw();

        if(water==1)water1.draw();
        else if(water==2)water2.draw();
        else water3.draw();

        frame++;
        if (frame % 10 == 0) {
          player.cycle++;
          player.cycle %= 3;
        }

        if(frame%150==0){
          water=1;
        }
        else if((frame+50)%150==0){
          water=2;
        }
        else if((frame+100)%150==0){
          water=3;
        }

        frame %= 1000000000

        player.draw();
        c.fillStyle="red";

        Object.keys(players).forEach(function(key) {
            if (key == "${signedAccountId}") {
              player.draw();
            } else {
              player.playersprites[0].x = players[key].x - playerlocation.x + window.innerWidth / 2 - 8 * pscale;
              player.playersprites[0].y = players[key].y - playerlocation.y + window.innerHeight / 2 - 11 * pscale;
              player.playersprites[0].draw();
            }

            //console.log(key, players[key]);
            //new Sprite("https://raw.githubusercontent.com/nelimalu/yapchain/main/client/src/assets/images/character/ycSpriteMForward.png",
            //            players[key].x - playerlocation.x + window.innerWidth / 2 - 8 * pscale,
            //            players[key].y - playerlocation.y + window.innerHeight / 2 - 11 * pscale,
            //            16 * 5, 22 * 5, 0, 0, 16, 22).draw();
            
        });

        if(keys.has("w") || keys.has("s") || keys.has("a") || keys.has("d") || keys.has("ArrowUp") || keys.has("ArrowDown") || keys.has("ArrowLeft") || keys.has("ArrowRight")){
          steps.play();
        } else {
          steps.pause();
        }

        foreground.draw();

        for (let bubble of bubbles) {
          bubble.draw();
        }

        //console.log(player.direction)
        //player.draw();
      }

      animate();
        </script>
    </body>
    </html>
  `;

  const onFormSubmit = e => {
    e.preventDefault();
    console.log(message);
    setNewGreeting(message);
    saveGreeting();
  }

  return (
    <>
      <iframe
        key={iframeKey}
        title="HTML Content"
        srcDoc={htmlContent}
        style={{ width: '100vw', height: '100vh', border: 'none' }}
      />
      <div style={{"width": "100vw", "display": "flex", "alignItems": "center", "justifyContent": "center"}}>
        <form onSubmit={onFormSubmit} className='yap-container'>
          <input onChange={e => setMessage(e.currentTarget.value)} maxLength={75} name='yap' className='yap-input pixel-corners' />
          <input className='yap-send pixel-corners' value={"submit!!!"} type='submit' />
          </form>
      </div>
    </>
  );
}
