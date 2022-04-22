const Sequelize = require ("sequelize");
const connection = require("../database/database");
const Teacher = require("../models/TeacherModel");

const ClassModel = connection.define('class',{
    idClass:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },

    titleClass:{
        type: Sequelize.STRING,
        allowNull: false
    },

});

Teacher.hasMany(ClassModel); //um professor tem várias matérias
ClassModel.belongsTo(Teacher); //uma matéria tem um professor

ClassModel.sync({force:false});
module.exports = ClassModel;