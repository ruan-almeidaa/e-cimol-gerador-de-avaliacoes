const Sequelize = require ("sequelize");
const connection = require("../database/database");
const TitleQuestionModel = require("./TitleQuestionModel");

const OptionQuestionModel = connection.define('OptionsQuestions',{
    idOption:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },

    bodyOption:{
        type: Sequelize.STRING,
        allowNull: true
    },

    rightOption:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },

    numberOption:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false
    }

});

TitleQuestionModel.hasMany(OptionQuestionModel); //uma pergunta tem várias opções
OptionQuestionModel.belongsTo(TitleQuestionModel); //uma opção tem uma pergunta

OptionQuestionModel.sync({force:false});
module.exports = OptionQuestionModel;