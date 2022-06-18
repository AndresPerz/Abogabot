const express = require('express');
const{ engine} = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyparser = require('body-parser');

const app = express();
app.set('port', 4000);

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.use(myconnection(mysql,{
    host: 'localhost',
    user: 'root',
    password: '31975',
    port: 3306,
    database: 'nodelogin'
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.listen(app.get('port'), () =>{
    console.log('Listening on port ', app.get('port'));
});

app.get('/', (req, res) => {
    res.render('home');
});