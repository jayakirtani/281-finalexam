var express = require('express');
var app = express();
var bodyParser = require("body-parser");
//mongodb native drivers.
var mongodb = require('mongodb');
//"MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://52.36.237.77:27017,52.35.35.128:27017,52.40.55.71:27017/cmpe281';

app.set('port', (process.env.PORT || 5000));

var db;

// Initialize connection once
MongoClient.connect(url, function(err, database) {
	if(err) throw err;

	db = database;

  // Start the application after the database connection is ready
  app.listen(app.get('port'), function () {
  	console.log('App listening on port '+ app.get('port') + '!');
  });
});


//app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Fetch all data , filter on fields
app.get('/', function (req, res) {
	var custcollection = db.collection('customers');
  //To Retrieve specific fields
  custcollection.find({},{"firstname":1 ,"_id" :0}).toArray(function(err,data){
   console.log(data);
   var custlist = ""
   data.forEach(function(user){
    custlist =custlist + user.firstname +"\n";
  });
   res.send(custlist);
 });

	//res.send('Hello World!');
	//res.render('index.html');
});

//Fetch specific data , filter on fields
//localhost:5000/Paula
app.get('/:firstname', function (req, res) {
  var custcollection = db.collection('customers');
  //To Retrieve specific record
  custcollection.findOne({"firstname" : req.params.firstname},{"_id" :0},function(err,data){
   console.log(data);
   res.send(data);
 });

});


//Fetch specific data with mutiple params
//localhost:5000/Paula/Crane
app.get('/:firstname/:lastname', function (req, res) {
  var custcollection = db.collection('customers');
  //To Retrieve specific record
  custcollection.findOne({"firstname" : req.params.firstname,"lastname" : req.params.lastname},{"_id" :0},function(err,data){
   console.log(data);
   res.send(data);
 });

});


app.post('/',function(req,res) {
  var custcollection = db.collection('customers');
  //Fetch data from req body and make a json document
  //var customer = {"firstname" : req.body.firstname , "lastname" : req.body.lastname , "gender" : req.body.gender}
  //custcollection.insert(customer , {w:1},function(err,data){

  //Or directly map req.body as it is a JSON  
  custcollection.insert(req.body , {w:1},function(err,data){
    if (err){
      console.log(err);
      return res.status(400).send('Error Inserting Data');
      //return res.status(400).json({ success: false, msg: 'Error Inserting Data'});
      
    } else {
      var data = req.
      res.send("Inserted :" +JSON.stringify(req.body));
    }
  })

});

app.put ('/:firstname',function(req,res){
  var custcollection = db.collection('customers');
  custcollection.update({"firstname" : req.params.firstname},{$set : {firstname : req.body.firstname}},{w:1},function (err,noofrecords){
  if (err){
        res.status(400).send('error updating record');
    }else {
      console.log (noofrecords);
      res.send("updated");
    } 
  })
});


app.delete('/:firstname',function(req,res){
  var custcollection = db.collection('customers');
  custcollection.remove({"firstname" : req.params.firstname},{w:1},function(err,noofrecords){
    if (err){
        res.status(400).send('error deleteing record');
    }else {
      console.log (noofrecords);
      res.send("Deleted");
    }
  })
});
