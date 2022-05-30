const express = require("express");
const router = express.Router();

const TeacherModel = require("../models/TeacherModel");
const AdminModel = require("../models/AdminModel");
const ClassModel = require("../models/ClassModel");
const TitlesQuestionModel = require("../models/TitleQuestionModel");
const OptionQuestionModel = require("../models/OptionQuestionModel");
const Sequelize = require ("sequelize");
const TestModel = require("../models/TestModel");

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

                res.render("teacher/test/viewTest", {titles: titlesQuestions, options:optionsQuestions});

            });
        });
        

    });

})
module.exports = router;