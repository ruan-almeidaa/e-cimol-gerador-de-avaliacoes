const Sequelize = require ("sequelize");
const connection = require("../database/database");
const TestModel = require("./TestModel");

const ResultsModel = connection.define('results',{
    idResult:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nameStudentResult:{
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement:false
    },
    emailStudentResult:{
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement:false
    },
    numberOfQuestions:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:false
    },
    numberRightQuestions:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:false
    },

});

TestModel.hasMany(ResultsModel); //uma prova tem várias respostas
ResultsModel.belongsTo(TestModel); //uma resposta pertence a uma prova



ResultsModel.sync({force:false});
module.exports = ResultsModel;