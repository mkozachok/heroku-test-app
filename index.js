var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var uuidv1 = require('uuid/v1');
var mongoose = require('mongoose');
require('dotenv').config()
var app = express();
var db = require('./db');

// API
var productApi = require('./src/api/product/controller')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to db
// mongoose.connect(
//     'mongodb+srv://mkozachok:MTeam2019@cluster0-klifg.mongodb.net/test?retryWrites=true&w=majority',
//      {useNewUrlParser: true }
//      );

mongoose.connect(process.env.DB_CONNECT);

// Products API
// GET
app.get('/products', function (req, res) {
    res.status(200).send({data: db.db}); // FIXME db.db
});

app.get('/products/:id', function (req, res) {
    var id = req.params.id;
    var product = db.db.find(function(item) {
        return item.id == id;
    })

    if (product) {
        res.status(200).send({data: product})
    }

    return res.status(404).send({
        success: 'false',
        message: 'product not found',
      });
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
      } else if(!req.body.price) {
        return res.status(400).send({
          success: 'false',
          message: 'price is required'
        });
      }

      // var product = {
      //   id: uuidv1(),
      //   title: req.body.title,
      //   description: req.body.description,
      //   previewImage: req.body.previewImage | '',
      //   price: req.body.price,
      // }

      // db.db.push(product);

      productApi.create(req.body, (newProduct) => {
        res.status(201).send({
          success: 'true',
          message: 'product added successfully',
          data: newProduct
        })
      })

      // return res.status(201).send({
      //   success: 'true',
      //   message: 'product added successfully',
      //   data: product
      // })
});

// DELETE
app.delete('/products/:id', function (req, res) {
    var id = req.params.id;
    var product = db.db.find(function(item) {
        return item.id == id;
    })

    if (product) {
        db.db = db.db.filter(function(item) {
            return item.id !== id
        })
        return res.status(200).send({
            success: 'true',
            message: 'product deleted successfuly',
          });
    }

    return res.status(404).send({
        success: 'false',
        message: 'product not found',
      });
});

app.listen(process.env.PORT || 5000)