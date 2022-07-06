const express = require('express');
const app = express();
const connection = require('./database/database');
const session = require('express-session');
const passport = require('passport');
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//conexao com banco de dados
connection
    .authenticate()
    .then(() =>{
        console.log("conexao feita");
    })
    .catch((error) => {
        console.log(error);
    });

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));

var userProfile;
app.use(passport.initialize());
app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

//definindo EJS como minha view engine
app.set('view engine','ejs');

//definindo que arquivos estáticos ficarão na pasta public
app.use(express.static('public'));

const teacherModel = require("./models/TeacherModel");
const classModel = require("./models/ClassModel");
const TitleQuestionModel = require("./models/TitleQuestionModel");
const OptionQuestionModel = require("./models/OptionQuestionModel");
const TestModel = require("./models/TestModel");
const categoryModel = require("./models/CategoryModel");

const adminController = require("./controllers/adminController");
const teacherController = require("./controllers/teacherController");
const studentController = require("./controllers/studentController");
const authController = require("./controllers/authController");

app.use("/",authController);
app.use("/",adminController);
app.use("/",teacherController);
app.use("/",studentController);


app.get("/", (req, res) =>{
    res.render("index");
});


app.listen(process.env.PORT || 8080);