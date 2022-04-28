const express = require('express');
const app = express();
const connection = require('./database/database');
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//definindo EJS como minha view engine
app.set('view engine','ejs');

//definindo que arquivos estáticos ficarão na pasta public
app.use(express.static('public'));

//conexao com banco de dados
connection
    .authenticate()
    .then(() =>{
        console.log("conexao feita");
    })
    .catch((error) => {
        console.log(error);
    });

//
const classModel = require("./models/ClassModel");
const teacherModel = require("./models/TeacherModel");
const categoryModel = require("./models/CategoryModel");
const TitleQuestionModel = require("./models/TitleQuestionModel");
const OptionQuestionModel = require("./models/OptionQuestionModel");
const TestModel = require("./models/TestModel");


const adminController = require("./controllers/adminController");
const teacherController = require("./controllers/teacherController");

app.use("/",adminController);
app.use("/",teacherController);

app.get("/", (req, res) =>{
    res.render("index");
})


app.listen(process.env.PORT || 8080);