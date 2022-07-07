const express = require("express");

function isLogged(req, res, next){

    if (req.user) {
        next();
    } else {
        res.render("index");
    }
}

module.exports = isLogged;