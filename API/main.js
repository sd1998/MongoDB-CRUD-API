const express = require('express');
const mongoDb = require('mongodb');
const mongoClient = mongoDb.MongoClient;
const bodyParser = require('body-parser');
const url ='mongodb://<username>:<password>@ds257495.mlab.com:57495/prototypedb';
var app = express();
const port = 8080;
app.use(bodyParser.urlencoded({ extended : true }));
mongoClient.connect(url,function(err,db){
  if(err){
    return console.log(err);
  }
  app.post('/addDocument',function(req,res){
    const data = {
      email : req.body.email,
      pass : req.body.pass
    };
    db.collection('useraccounts').insert(data,function(err,result){
      if(err){
        console.log(err);
        res.send({'error' : 'An error has occured'});
      }
      res.send(res.send(result.ops[0]));
      console.log('Document added');
    });
  });
  app.get('/find/:id',function(req,res){
    var id = req.params.id;
    var data = {
      '_id' : new ObjectId(id)
    };
    db.collection('useraccounts').findOne(data,function(err,result){
      if(err){
        console.log(err);
        res.send({'error' : 'An error has occured'});
      }
      res.send(result);
    });
  });
  app.delete('/delete/:id',function(req,res){
    var id = req.params.id;
    var data = {
      '_id' : new ObjectId(id)
    };
    db.collection('useraccounts').remove(data,function(err,result){
      if(err){
        console.log(err);
        res.send({'error' : 'An error has occured'});
      }
      res.send('Document ' + id + ' deleted');
    });
  });
  app.put('/update/:id',function(req,res){
    var id = req.params.id;
    var data = {
      '_id' : new ObjectId(id)
    };
    var documentData = {
      email : req.body.email,
      pass : req.body.pass
    };
    db.collection('useraccounts').update(data,documentData,function(err,result){
      if(err){
        console.log(err);
        res.send({'error' : 'An error has occured'});
      }
      res.send('Document ' + id + ' updates');
    });
  });
  app.listen(port,function(req,res){
    console.log('Listening to 8080');
  });
});
