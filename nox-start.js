var express = require('express');

var log = require('./lib/log.js');

var app = require('./nox-appserver.js')('template', 
					function(mod) { return require(mod); }, log);

app.noxApp.page('/login.html', [ './lib/auth.js' ], [ './lib/login.js' ]);
app.noxApp.page('/index.html', [ './lib/auth.js', './lib/app.js' ], 
		[ './lib/index.js' ]);

app.expressServer.use(app.expressServer.router);
app.expressServer.use('/', express.static('html'));
app.expressServer.use(function(req, res, next) {
    res.redirect('/login.html');
});

var port = 8080;
if( typeof process.argv[2] == 'number' )
    port = parseInt(process.argv[2]);
    
log('starting server at port ' + port);
var serverinst = app.httpServer.listen(port);

process.on('SIGINT', function() {
    log('stopping server gracefully');
    serverinst.close();
    process.on('exit', function() {
	log('server stopped gracefully');
    });
});

log('listening at ' + port);





