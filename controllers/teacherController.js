const express = require("express");
const router = express.Router();

const TeacherModel = require("../models/TeacherModel");
const AdminModel = require("../models/AdminModel");
const ClassModel = require("../models/ClassModel");
const TitlesQuestionModel = require("../models/TitleQuestionModel");
const OptionQuestionModel = require("../models/OptionQuestionModel");

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
        if(result >= numberQuestionsTest){

            var questionsTest = 0[0];

            for(var i=0; i<=numberQuestionsTest; i++){
                questionsTest = Math.floor(Math.random() * numberQuestionsTest)[i];
            }

            res.send(questionsTest);
            
/*             TestModel.create({
                numberQuestionsTest: numberQuestionsTest,
                classIdClass: clas
            }) */
        }else{
        
            ClassModel.findAll().then(classes =>{
                res.render("teacher/test/new", {classes:classes, errNumberQuestions:true});
            });
        }
    })
})



module.exports = router;