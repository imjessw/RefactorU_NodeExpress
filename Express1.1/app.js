
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/hi',function(req, res){
	res.send("hi")
})
app.get('/welcome',function(req, res){
	res.send("welcome")

})
app.post('/formsubmit', function(req, res){
	console.log("hello")
	res.send("hello")

})
app.get('/heller', function(req, res){

	// res.send("hell'er")
	var fs=require('fs');

 fs.readFile(__dirname + '/basic.html', function(err,data){

		if(err){
			res.writeHead(404)
			res.end("FILE NOT FOUND")
		}
		else{
			res.writeHead(200)
			res.end(data)
			req.redirect('success')
		}
	})
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
