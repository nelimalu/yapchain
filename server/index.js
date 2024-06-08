const express = require('express');
const app = express();

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

app.post("/join", (req, res) => {

});

app.post("/leave", (req, res) => {

});

app.post("/coords", (req, res) => {
    //console.log("Received POST request with coordinates");
    let x = req.body.x;
    let y = req.body.y;
    console.log("Coordinates received:", x, y);
    res.json({ x, y });
    res.send({});
});

app.listen(2000, () => {
    console.log("Server listening on port 2000");
});
