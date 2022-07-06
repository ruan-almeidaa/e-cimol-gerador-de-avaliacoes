const express = require("express");
const AdminModel = require("../models/AdminModel");

var isAdm = function (email){

    AdminModel.count({
        where:{
            emailAdmin: email
        }
    }).then(resultAdm =>{
         if(resultAdm > 0){
            next();
         }      
    });

    return isAdm;
}

module.exports = isAdm;