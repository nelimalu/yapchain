const express = require('express');
const app = express();


var players = {};

const port = process.env.PORT || 3000;


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());



app.get("/message", (req, res) => {
    console.log("Received GET request");
    res.send("I GOT YOUR MESSAGE!!!");
});


app.get("/reset", (req, res) => {
    players = {};
    res.send("successfully reset player")
});



app.post("/leave", (req, res) => {
    let id = req.id;
    delete players[id];
});

app.post("/coords", (req, res) => {
    //console.log("Received POST request with coordinates");
    let x = req.body.x;
    let y = req.body.y;
    let direction = req.body.direction;
    let id = req.body.id;

    players[id] = {
        "x": x,
        "y": y,
        "direction": direction
    }

    console.log("Coordinates received:", id, x, y, direction);
    res.send(players);
});

// '0.0.0.0'
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});