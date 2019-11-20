var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var uuidv1 = require('uuid/v1');
var app = express();
var db = require('./db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Products API
// GET
app.get('/products', function (req, res) {
    res.status(200).send({data: db.db}); // FIXME db.db
});

app.get('/products/:id', function (req, res) {
    var id = req.params.id;
    res.status(200).send({data: db.db.find(function(item) {
        return item.id == id;
    })})
});

// POST
app.post('/products', function (req, res) {
    if(!req.body.title) {
        return res.status(400).send({
          success: 'false',
          message: 'title is required'
        });
      } else if(!req.body.description) {
        return res.status(400).send({
          success: 'false',
          message: 'description is required'
        });
      }

      var product = {
        id: uuidv1(),
        title: req.body.title,
        description: req.body.description,
        previewImage: '',
        price: '0',
      }

      db.db.push(product);

      return res.status(201).send({
        success: 'true',
        message: 'product added successfully',
        data: product
      })
});


app.listen(process.env.PORT || 5000)