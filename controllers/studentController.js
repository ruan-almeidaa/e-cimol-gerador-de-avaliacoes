const express = require("express");
const router = express.Router();

const TeacherModel = require("../models/TeacherModel");
const AdminModel = require("../models/AdminModel");
const ClassModel = require("../models/ClassModel");
const TitlesQuestionModel = require("../models/TitleQuestionModel");
const OptionQuestionModel = require("../models/OptionQuestionModel");
const Sequelize = require ("sequelize");
const TestModel = require("../models/TestModel");
const ResultsModel = require("../models/ResultsModel");

router.get("/aluno/avaliacao/:id",(req,res) =>{

    let idTest = parseInt(req.params.id);

    TestModel.findByPk(idTest).then(test =>{

        //converte o JSON que veio do select, para string e depois tranforma para array usando split.
        let strQuestionsTest = test.questionsTest;
        let arrQuestionsTest = strQuestionsTest.split(",");

        //converte o array de strings para um array de inteiros.
        let intQuestionsTest=[];
        arrQuestionsTest.forEach( strIdTest =>{
            intQuestionsTest.push(parseInt(strIdTest));
        });

        //buscando as perguntas e as opções, através do select in.
        TitlesQuestionModel.findAll({
            where:{ 
                idTitle: intQuestionsTest
            }

        }).then(titlesQuestions =>{

            OptionQuestionModel.findAll({
                where:{ 
                    TitlesQuestionIdTitle: intQuestionsTest
                }

            }).then(optionsQuestions =>{
                res.render("teacher/test/viewTest", {titles: titlesQuestions, options:optionsQuestions, idTest: idTest});

            });
        });
        

    });

});

router.post("/aluno/avaliacao/enviando",(req,res) =>{
  let answers = req.body.allAnswers;
  let nameStudent = req.body.nameStudent;
  let emailStudent = req.body.emailStudent
  let idTest = parseInt(req.body.idTest);

  let numberRightQuestions = 0;
  let numberOfQuestions = 0;

  let arrAnswers = answers.split(",");
  let intArrAnswers=[];
    arrAnswers.forEach( strAnswer =>{
    intArrAnswers.push(parseInt(strAnswer));
    });

    OptionQuestionModel.count({
        where:{
            id_option: intArrAnswers,
            right_option:true
        }
    }).then(resultNumberRightQuestions =>{
        numberRightQuestions = resultNumberRightQuestions;
            TestModel.findByPk(idTest).then(resultIdTest =>{
                numberOfQuestions = resultIdTest.numberQuestionsTest;

                ResultsModel.create({
                    nameStudentResult: nameStudent,
                    emailStudentResult: emailStudent,
                    numberOfQuestions: numberOfQuestions,
                    numberRightQuestions: numberRightQuestions,
                    testIdTest: idTest
                }).then(() =>{
                    res.redirect("/menu");
                }).catch(erro =>{
                    res.redirect("/");
                }) 

            })
        })

});

router.get("/aluno/avaliacao/resultados/:id",(req,res) =>{
    let idTest = parseInt(req.params.id);
    ResultsModel.findAll({
        where:{
            test_id_test: idTest
        }
    }).then(results =>{
        res.render("teacher/results/results",{results:results});
    }).catch(erro =>{
        console.log(erro);
       res.redirect("/");
    }) 
});

module.exports = router;