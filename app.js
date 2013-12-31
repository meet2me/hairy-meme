var http = require('http');
var express = require('express');
var app = express();
app.locals.moment = require('moment');
require('./app/appConfig')(app);
require('./app/router')(app);

http.createServer(app).listen(app.get('port'), function(){
}).on('error',function(error){
	// console.log("Error On:" ,error);
});