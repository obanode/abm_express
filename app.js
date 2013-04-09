/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, tareas = require('./routes/tareas')
, user = require('./routes/user')
, http = require('http')
, path = require('path')
, fs = require('fs')
, config = require('./config');

mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo', function(err){
    if(!err){
        console.log("Conectado a MongoDB");
    }else{
        throw err;
    }
});

var app = express();
 
app.configure(function(){
    app.set('port', process.env.PORT || config['Default']['port']);
    app.set('views', config['Default']['views']);
    app.set('view engine', config['Default']['engine']);
    app.use(express.favicon());
    app.use(express.logger(config['Default']['logger_mode']));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});


// Importar rutas
fs.readdirSync('routes').forEach(function(file) {
    if ( file[0] == '.' ) return;
    var routeName = file.substr(0, file.indexOf('.'));
    require('./routes/' + routeName)(app);
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});