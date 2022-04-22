const Sequelize = require ("sequelize");
const connection = require("../database/database");

const TeacherModel = connection.define('teachers',{
    idTeacher:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },

    nameTeacher:{
        type: Sequelize.STRING,
        allowNull: false
    },

    emailTeacher:{
        type: Sequelize.STRING,
        allowNull: false
    }

});

TeacherModel.sync({force:true});
module.exports = TeacherModel;