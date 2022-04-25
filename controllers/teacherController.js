const express = require("express");
const router = express.Router();

const TeacherModel = require("../models/TeacherModel");
const AdminModel = require("../models/AdminModel");
const ClassModel = require("../models/ClassModel");

//========== rotas GET ==========

//rota para tela princpal do professor
router.get("/professor", (req,res) =>{
    res.render("teacher/index");
});

router.get("/professor/categorias", (req,res) =>{
    res.render("teacher/index");
});



module.exports = router;