/**
 * Created by yuyang on 05/07/2017.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    res.render('location', { title: 'Location' });
});

router.post('/add', function(req, res, next) {
    var name = req.body.name;
    var category = req.body.category;
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;
    var MongoClient = require('mongodb').MongoClient;

    var URL = 'mongodb://localhost:27017/location'

    MongoClient.connect(URL, function(err, db) {
        if (err) throw err;
        var location = {'name': name, 'category' : category, coord:[longitude,latitude]};
        var collection = db.collection('locations')
        collection.insert(location, function(err, result) {
            if (err) throw err;
            console.dir("success"+ JSON.stringify(result));
            return db.close();
        })
    })



    res.render('location', { title: 'Location' });
});

module.exports = router;