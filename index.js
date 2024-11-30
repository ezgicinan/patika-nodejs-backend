const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const config = require('./config/db');

const app = express();

app.use(express.json());

//For URL
app.use(express.urlencoded({extended: true}))

//Database connection process
config.connectionDB();

//localhost:3000 - http://localhost:3000/
//örnek router
app.use('/test', function(req,res,next){
    console.log('Middleware')
    next();
    //res.status(200).send({success:true})
}, function(req,res){
    console.log('Controller')
  res.status(200).send({success:true})
})

app.use('/api', routes);

app.listen(3000,() =>{
    console.log('ayaktayiz')
})