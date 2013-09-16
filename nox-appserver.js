module.exports = function(appname, requirefun, logfun) {
    
    if( typeof logfun != 'function' )
	logfun = function() {}

    var http = require('http');
    var express = require('express');
    var async = require('async');
    
    var expressServer = express();
    var httpServer = http.createServer(expressServer);

    expressServer.use(express.cookieParser());
    expressServer.use(express.session({    
	key: 'nox-app-' + appname + '.sid', 
	secret: 'cookie-secret-' + appname + '-34987326782',
	cookie: { path: '/', httpOnly: true, maxAge: 100000000 }
    }));

    var usedFuns = [];
    expressServer.use(function(req, res, next) {
	async.eachSeries(usedFuns, function(fun, funcb) {
	    fun(req, res, function(err) {
		funcb(err);
	    });
	}, next);
    });

    expressServer.use(expressServer.router);
    expressServer.use('/', express.static(__dirname + '/html'));
    
    var noxapp = require('nox').nox(
	requirefun,
	'nox-app-' + appname + '.sid', 
	logfun);
    
    expressServer.get('/js/nox-client.js', noxapp.get);
    
    var socketServer = require('socket.io').listen(httpServer);
    socketServer.set('authorization', noxapp.socketAuth);
    socketServer.on('connection', noxapp.socketConn);
    
    expressServer.useBefore = function(fun) {
	usedFuns.push(fun);
    }

    return {
	noxApp: noxapp,
	expressServer: expressServer,
	httpServer: httpServer
    }
}

