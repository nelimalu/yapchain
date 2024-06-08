const express = require('express')
const app = express()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get("/message", (req,res) => {
    console.log("received")
    res.send("I GOT YOUR MESSAGE!!!")
})

app.listen((2000), () =>  {
    console.log("listening")
})