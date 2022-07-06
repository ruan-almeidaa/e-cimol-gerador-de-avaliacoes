const express = require("express");
const AdminModel = require("../models/AdminModel");

function adminAuth(req, res, next){
    AdminModel.count({
        where:{
            emailAdmin: userProfile.email
        }
    }).then(resultAdm =>{
         if(resultAdm > 0){
            next();
         }
         else{
            res.redirect("/");
         }      
    });
    
}

module.exports = adminAuth;