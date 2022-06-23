const express = require("express");
const TeacherModel = require("../models/TeacherModel");
const AdminModel = require("../models/AdminModel");

var teacherOrAdm = async function (email){

    let userLevel = 0;
    let userAdm = 10;
    let userTeacher = 5;

    TeacherModel.count({
        where:{
            emailTeacher: email
        }
    }).then(resultTeacher =>{
        if(resultTeacher > 0){
            userLevel += userTeacher;
        }
    });

    AdminModel.count({
        where:{
            emailAdmin: email
        }
    }).then(resultAdm =>{
        if(resultAdm > 0){
            userLevel += userAdm;
        }
    });

    return userLevel;
}

module.exports = teacherOrAdm;