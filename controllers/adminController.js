const express = require("express");
const router = express.Router();

const TeacherModel = require("../models/TeacherModel");
const AdminModel = require("../models/AdminModel");

//========== rotas GET ==========

//rota para tela princpal do administrador
router.get("/admin", (req,res) =>{
    res.render("admin/index");
})

//rota para tela onde lista todos os professores cadastrados
router.get("/admin/professores", (req,res) =>{
    TeacherModel.findAll().then(teachers =>{
       res.render("admin/teacher/teacher", {teachers:teachers}); 
    }).catch(erro =>{
        res.redirect("/")
    });
    
})

//rota para tela de cadastro de novos professores
router.get("/admin/professores/cadastrar", (req,res) =>{
    res.render("admin/teacher/newTeacher.ejs");
})

//rota para tela de edição de um professor
router.get("/admin/professores/editar/:id", (req, res) =>{
    let idTeacher = req.params.id;

    if(isNaN(idTeacher)){
        res.redirect("/admin/professores");
    }

    TeacherModel.findByPk(idTeacher).then(teacher =>{
        if(teacher != undefined){
            res.render("admin/teacher/editTeacher", {teacher: teacher});
        }else{
            res.redirect("/admin/professores");
        }
    }).catch(erro =>{
        res.redirect("/admin/professores");
    });
});

router.get("/admin/cadastrar", (req, res) =>{
    res.render("admin/newAdm");
});

//========== rotas POST ==========


//rota que a tela chama para cadastrar um professor
router.post("/admin/professores/cadastrando", (req,res) =>{
    let nameTeacher = req.body.name;
    let emailTeacher = req.body.email;

    TeacherModel.create({
        nameTeacher: nameTeacher,
        emailTeacher: emailTeacher
    }).then(() =>{
        res.redirect("/admin/professores");
    }).catch(erro =>{
        res.redirect("/admin/professores");
    }) 
});

//rota que a tela de edição chama, para editra um professor com base no seu id
router.post("/admin/professores/editando", (req, res) =>{
    let idTeacher = req.body.idTeacher;
    let nameTeacher = req.body.name;
    let emailTeacher = req.body.email;

    TeacherModel.update({nameTeacher : nameTeacher, emailTeacher : emailTeacher}, {
        where:{
            idTeacher : idTeacher
        }
    }).then(()=>{
        res.redirect("/admin/professores");
    }).catch((error) => {
        console.log(error);
        res.redirect("/admin/professores");
    });
});

//rota que o botão de deletar chama
router.post("/admin/professores/delete", (req,res) =>{

    let id = req.body.id;

    if(id != undefined && id != isNaN){

        TeacherModel.destroy({
            where:{
                idTeacher: id
            }
        }).then(() =>{
            res.redirect("/admin/professores");
        }).catch((error) => {
            console.log(error);
        });
    }else{
        res.redirect("/admin/professores");
    }
});

//rota que a tela chama para cadastrar um administrador
router.post("/admin/cadastrando", (req,res) =>{
    let nameAdm = req.body.name;
    let emailAdm = req.body.email;

    AdminModel.create({
        nameAdmin: nameAdm,
        emailAdmin: emailAdm
    }).then(() =>{
        res.redirect("/admin");
    }).catch(erro =>{
       console.log(erro)
    }) 
});

module.exports = router;