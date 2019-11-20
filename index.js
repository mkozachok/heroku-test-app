var express = require('express');
var cors = require('cors');
var app = express();
var db = require('./db')

app.use(cors())

app.get('/products', function (req, res) {
    res.status(200).send({data: db.db}) // FIXME db.db
});

app.get('/products/:id', function (req, res) {
    var id = req.params.id
    res.status(200).send({data: db.db.find(function(item) {
        return item.id == id
    })})
});

app.listen(process.env.PORT || 5000)