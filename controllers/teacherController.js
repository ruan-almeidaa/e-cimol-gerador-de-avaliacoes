const express = require("express");
const router = express.Router();

const TeacherModel = require("../models/TeacherModel");
const AdminModel = require("../models/AdminModel");
const ClassModel = require("../models/ClassModel");
const TitlesQuestionModel = require("../models/TitleQuestionModel");
const OptionQuestionModel = require("../models/OptionQuestionModel");
const Sequelize = require ("sequelize");

//========== rotas GET ==========

//rota para tela princpal do professor
router.get("/professor", (req,res) =>{
    res.render("teacher/index");
});

router.get("/professor/categorias", (req,res) =>{
    res.render("teacher/index");
});

router.get("/professor/perguntas", (req,res) =>{

    //preciso passar os professores para a view para exibir o dropdown
    ClassModel.findAll().then(classes =>{
        res.render("teacher/question/new", {classes:classes});
    });
});

router.get("/professor/avaliacao", (req, res) =>{
    res.render("teacher/test/index")
});

router.get("/professor/avaliacao/cadastrar", (req, res) =>{

        //preciso passar os professores para a view para exibir o dropdown
        ClassModel.findAll().then(classes =>{
            res.render("teacher/test/new", {classes:classes, errNumberQuestions:false});
        });
    
});

router.post("/professor/perguntas/cadastrando", (req,res) =>{
    let clas = req.body.class;
    let bodyQuestion = req.body.bodyQuestion;
    let rightOption = parseInt(req.body.rightOption);

    let options = [req.body.option1,req.body.option2,req.body.option3,req.body.option4,req.body.option5];

    TitlesQuestionModel.create({
        bodyTitle: bodyQuestion,
        classIdClass: clas
    }).then(result =>{
        let idInserted = parseInt(result.idTitle);

        for(var i = 0; i< options.length; i++){
            OptionQuestionModel.create({
                bodyOption:options[i],
                numberOption: i,
                TitlesQuestionIdTitle: idInserted
            })

            if(rightOption == i){
                OptionQuestionModel.update({rightOption: true}, {
                    where:{
                        TitlesQuestionIdTitle: idInserted,
                        numberOption: i
                    }
                })
            }

        }
        res.redirect("/professor")
    })

});

router.post("/professor/avaliacao/cadastrando", (req,res) =>{
    let clas = req.body.class;
    let numberQuestionsTest = req.body.numberQuestions;

    TitlesQuestionModel.count({
        where:{
            classIdClass: clas
        }
    }).then(result =>{

        //valida se existe perguntas suficientes, se sim trazemos aleatóriamente
        if(result > numberQuestionsTest){

            TitlesQuestionModel.findAll({
                attributes: ['idTitle'],
                limit: numberQuestionsTest,
                order: [
                    [Sequelize.fn('RANDOM')]
                ],
                
                where: {
                    classIdClass: clas
                }
            }).then(allQuestions => {
                res.send(allQuestions);
            })

        }

        //valida se o número de perguntas existente no banco é o mesmo que foi informado. nesse caso não precisamos trazer aleatório.
        else if(result == numberQuestionsTest){
            
        }

        //se não tiver perguntas o suficiente, mostra a mensagem
        else{
            ClassModel.findAll().then(classes =>{
                res.render("teacher/test/new", {classes:classes, errNumberQuestions:true});
            });
        }
    })
})



module.exports = router;