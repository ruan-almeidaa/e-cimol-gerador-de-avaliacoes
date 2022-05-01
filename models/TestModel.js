const Sequelize = require ("sequelize");
const connection = require("../database/database");
const ClassModel = require("./ClassModel");

const TestModel = connection.define('tests',{
    idTest:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    numberQuestionsTest:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:false
    },
    questionsTest:{
        type: Sequelize.STRING,
        allowNull: false
    }

});

ClassModel.hasMany(TestModel); //uma matéria tem várias avaliações
TestModel.belongsTo(ClassModel); //uma avaliação só tem uma matéria



TestModel.sync({force:true});
module.exports = TestModel;