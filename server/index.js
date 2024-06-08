const express = require('express')
const app = express()

app.get("/message", (req,res) => {
    res.send("I GOT YOUR MESSAGE!!!")
})

app.listen((2000), () =>  {
    console.log("listening")
})