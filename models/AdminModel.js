const Sequelize = require ("sequelize");
const connection = require("../database/database");

const AdminModel = connection.define('admins',{
    idAdmin:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },

    nameAdmin:{
        type: Sequelize.STRING,
        allowNull: false
    },

    emailAdmin:{
        type: Sequelize.STRING,
        allowNull: false
    }

});

AdminModel.sync({force:false});
module.exports = AdminModel;