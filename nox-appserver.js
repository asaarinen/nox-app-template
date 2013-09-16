module.exports = function(appname, htmldir, port) {
    
    var http = require('http');
    var express = require('express');
    var async = require('async');
    
    var expressServer = express();
    var httpServer = http.createServer(expressServer);
    
    var log = require('./lib/log.js');

    expressServer.use(express.cookieParser());
    expressServer.use(express.session({    
	key: 'nox-app-' + appname + '.sid', 
	secret: 'cookie-secret-' + appname + '-34987326782',
	cookie: { path: '/', httpOnly: true, maxAge: 100000000 }
    }));

    expressServer.use(expressServer.router);
    expressServer.use('/', express.static(htmldir));
    
    var noxapp = require('nox').nox(
	function(str) { return require(str); },
	'nox-app-' + appname + '.sid', 
	function(str) { log(str); });
    
    expressServer.get('/js/nox-client.js', noxapp.get);
    
    var socketServer = require('socket.io').listen(httpServer);
    socketServer.set('authorization', noxapp.socketAuth);
    socketServer.on('connection', noxapp.socketConn);
    
    if( typeof port != 'number' )
	port = 8080;
    
    log('starting server at port ' + port);
    var serverinst = httpServer.listen(port);
    
    process.on('SIGINT', function() {
	log('stopping server gracefully');
	serverinst.close();
	process.on('exit', function() {
	    log('server stopped gracefully');
	});
    });

    log('listening at ' + port);

    return {
	noxapp: noxapp,
	server: server
    }
}

