const Sequelize = require ("sequelize");
const connection = require("../database/database");

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

ClassModel.sync({force:true});
module.exports = ClassModel;