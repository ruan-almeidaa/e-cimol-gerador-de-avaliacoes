const Sequelize = require ("sequelize");
const connection = require("../database/database");
const ClassModel = require("../models/ClassModel");

const TitleQuestionModel = connection.define('TitlesQuestions',{
    idTitle:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },

    bodyTitle:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

ClassModel.hasMany(TitleQuestionModel); //uma matéria tem várias perguntas
TitleQuestionModel.belongsTo(ClassModel); //uma pergunta tem uma matéria

TitleQuestionModel.sync({force:false});
module.exports = TitleQuestionModel;