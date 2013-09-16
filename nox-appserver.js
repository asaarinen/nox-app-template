var fs = require('fs');
var http = require('http');
var express = require('express');
var async = require('async');

var expressServer = express();
var httpServer = http.createServer(expressServer);

var log = require('./lib/log.js');

expressServer.use(express.cookieParser());
expressServer.use(express.session({    
    key: 'nox-template.sid', 
    secret: 'cookie-secret-34987326782',
    cookie: { path: '/', httpOnly: true, maxAge: 100000000 }
}));

expressServer.use(expressServer.router);
expressServer.use('/', express.static('html'));

var noxapp = require('nox').nox(
    function(str) { return require(str); },
    'nox-template.sid', 
    function(str) { log(str); });

expressServer.get('/js/nox-client.js', noxapp.get);

var socketServer = require('socket.io').listen(httpServer);
socketServer.set('authorization', noxapp.socketAuth);
socketServer.on('connection', noxapp.socketConn);

noxapp.page('/login.html', [ './lib/auth.js' ], [ './lib/login.js' ]);
noxapp.page('/index.html', [ './lib/auth.js', './lib/app.js' ], [ './lib/index.js' ]);

var port = 8080;

async.waterfall([
    function(wfcb) {
	if( typeof process.argv[2] == 'string' )
	    if( process.argv[2].match(/^[0-9]+$/) )
		port = parseInt(process.argv[2]);
	
	log('starting server at port ' + port);
	var serverinst = httpServer.listen(port);

	process.on('SIGINT', function() {
	    log('stopping server gracefully');
	    serverinst.close();
	    process.on('exit', function() {
		log('server stopped gracefully');
	    });
	});
	wfcb();
    }
], function(err) {
    if( err ) {
	log('error starting server: ' + err);
	process.exit(1);
    } else
	log('listening at ' + port);
});

