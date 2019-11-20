var express = require('express');
var app = express();
var db = require('./db')

app.get('/products', function (req, res) {
    res.status(200).send({items: db})
});

app.listen(process.env.PORT || 5000)