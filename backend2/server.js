const express = require('express')
const app = express()
const fs = require('fs')
const carData = require("./CarData.json")
const PORT = 8000

app.get('/' , (req,res) => {
    res.send("Server Ready !!!")
})

app.get('/api/cars' , (req,res) => {
    res.send(carData)
})


app.listen(PORT,()=>{
    console.log(`App is listening on Port Number ${PORT}`)
})