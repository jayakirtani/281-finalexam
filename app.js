var express = require('express');
var bodyParser = require("body-parser");
//mongodb native drivers.
var mongodb = require('mongodb');
//"MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://52.36.237.77:27017,52.35.35.128:27017,52.40.55.71:27017/cmpe281';

var app = express();
app.set('port', (process.env.PORT || 5000));

//Fetches all html files from public folder
app.use(express.static(__dirname + '/public'));

//Parses the request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	//Asks user to input name
	res.render('index.html');
});

app.post('/',function(req,res) {
	//fetches the username from form submit 
	//var data = req.body.usrname;
	var usernames = "";
	//console.log(data);
	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} 
		else {
    		//HURRAY!! We are connected. :)
    		console.log('Connection established to', url);
    		// Get the documents collection
    		var collection = db.collection('username');

    		//Create some users
    		var user = {name: req.body.usrname};

    		// Insert some users
    		collection.insert(user,{w:1}, function (err, result) {
    			if (err) {
    				console.log(err);
    			} else {
    				console.log('Inserted %d documents into the "username" collection. The documents inserted with "_id" are:', result.length, result);
    			}

      			
  			});
    		var data1 ="";
  			collection.find({},{"name":1 ,"_id" :0}).toArray(function(err,data){
      				console.log(data);
      				res.send(data);
      				// //Close connection	
      				// db.close();
      			});


  			
		}
	});
	//var send_data = "Inserted username into mongo\n"+ usernames;
	//res.send(send_data);


})

app.listen(app.get('port'), function () {
	console.log('Example app listening on port '+ app.get('port') + '!');
});