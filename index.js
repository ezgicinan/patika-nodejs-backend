const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const config = require('./config/db');

const app = express();

//Request management configurations
//For request body
app.use(express.json());
//For URL
app.use(express.urlencoded({extended: true}))

//Database connection process
config.connectionDB();

//localhost:3000 - http://localhost:3000/
//örnek router
app.use('/api', routes);
app.listen(3000,() =>{
    console.log('ayaktayiz')
})

app.get('/api/test', async(req,res) =>{
    console.log('karşıladık');
    res.status(200).send({
        response:'process success'
    })
})