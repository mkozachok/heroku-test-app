var express = require('express');
var cors = require('cors');
var app = express();
var db = require('./db')

app.use(cors())

app.get('/products', function (req, res) {
    res.status(200).send({items: db})
});

app.listen(process.env.PORT || 5000)