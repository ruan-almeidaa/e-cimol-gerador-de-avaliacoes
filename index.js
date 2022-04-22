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
const adminController = require("./controllers/adminController");

app.use("/",adminController);

app.get("/", (req, res) =>{
    res.render("index");
})

app.listen(process.env.PORT || 8080);