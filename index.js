const express = require('express');
const app = express();
const connection = require('./database/database');

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

app.get("/", (req, res) =>{
    res.render("index");
})

app.listen(process.env.PORT || 8080);