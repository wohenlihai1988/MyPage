var express = require('express');
var http = require('http');
var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.redirect('/home.html');
});

var server = http.createServer(app);
server.listen(3000);
console.log('server started on 3000 port')