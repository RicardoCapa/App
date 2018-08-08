

var exp = require('express');
var app=exp();
var path = require('path');

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/PaginaButtom.html'));
});

app.listen(3000);
console.log("Conexion establecida")