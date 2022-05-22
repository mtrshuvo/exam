const express = require("express");
const morgan = require("morgan");
const cors = require("cors");


module.exports = (app)=>{


    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    //dev
    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'))
    }
}