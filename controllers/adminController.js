const express = require("express");
const router = express.Router();

const TeacherModel = require("../models/TeacherModel");
const AdminModel = require("../models/AdminModel");
const ClassModel = require("../models/ClassModel");

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
    res.render("admin/adm/newAdm");
});


router.get("/admin/materias", (req, res) =>{
    ClassModel.findAll().then(classes => {
        TeacherModel.findAll().then(teachers =>{
            res.render("admin/class/index", {classes:classes, teachers:teachers});
        }).catch(erro =>{
            res.redirect("admin/materias");
        })    
    }).catch(erro =>{
        res.redirect("/admin/materias");
    });
});

router.get("/admin/materias/cadastrar", (req, res) =>{
    TeacherModel.findAll().then(teachers => {
        res.render("admin/class/new", {teachers:teachers});
    }).catch(erro =>{
        res.redirect("/admin/materias");
    });
  
});

router.get("/admin/materias/editar/:id",(req,res) =>{
    
    let id = req.params.id;

    ClassModel.findByPk(id).then(clas =>{

        if(clas != undefined){
            //preciso passar os professores para a view para exibir o dropdown
            TeacherModel.findAll().then(teachers =>{
                res.render("admin/class/edit", {clas:clas, teachers:teachers});
            });
            
        }else{
            res.redirect("/admin/materias");
        }
    }).catch(err => {
        console.log(err);
        res.redirect("/admin/materias");

    })
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

//rota que a tela chama para cadastrar um professor
router.post("/admin/materias/cadastrando", (req,res) =>{
    let nameClass = req.body.name;
    let idTeacher = req.body.teacher;

    ClassModel.create({
        titleClass: nameClass,
        teacherIdTeacher: idTeacher
    }).then(() =>{
        res.redirect("/admin/materias");
    }).catch(erro =>{
        res.redirect("/admin/materias");
    }) 
});

router.post("/admin/materias/editando",(req,res) =>{
    let id = req.body.id;
    let name = req.body.name;
    let teacher = req.body.teacher;

    ClassModel.update({titleClass:name, teacherIdTeacher:teacher},{
        where:{
            idClass: id
        }
    }).then(() =>{
        res.redirect("/admin/materias");
    }).catch(err => {
        console.log(err);
        res.redirect("/admin/materias");
    });
});

//rota que o botão de deletar chama
router.post("/admin/materias/delete", (req,res) =>{

    let id = req.body.id;

    if(id != undefined && id != isNaN){

        ClassModel.destroy({
            where:{
                idClass: id
            }
        }).then(() =>{
            res.redirect("/admin/materias");
        }).catch((error) => {
            console.log(error);
        });
    }else{
        res.redirect("/admin/materias");
    }
});

module.exports = router;