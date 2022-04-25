const Sequelize = require ("sequelize");
const connection = require("../database/database");
const Class = require("../models/ClassModel");

const CategoryModel = connection.define('categories',{
    idCategory:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },

    nameCategory:{
        type: Sequelize.STRING,
        allowNull: false
    },

});

Class.hasMany(CategoryModel); //uma matéria tem várias categorias
CategoryModel.belongsTo(Class); //uma categoria tem apenas uma matéria

CategoryModel.sync({force:false});
module.exports = CategoryModel;