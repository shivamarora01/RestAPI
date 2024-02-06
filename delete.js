const express = require ('express');
const fs = require('fs')
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000
app.use(express.urlencoded({extended : false}))

app.delete('/api/users/:id' , (req,res) => {
    const id = req.params.id
    console.log(id)
})