var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.set('port', (process.env.PORT || 5000));

//app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Hello World!');
	//res.render('index.html');
});

app.post('/',function(req,res) {
	//var data = req.body.usrname;
	//console.log(data);
	//res.send(data);
})

app.listen(app.get('port'), function () {
	console.log('Example app listening on port '+ app.get('port') + '!');
});