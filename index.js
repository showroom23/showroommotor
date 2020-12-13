const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const layouts = require('express-ejs-layouts');

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded());
app.use(express.static('public'));


app.use(session({
    cookie: {}
}));

app.use(layouts);
app.set('layouts', 'layouts/index.ejs');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


const indexRouter = require('./routers/index')
