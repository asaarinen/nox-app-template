var express = require('express');

var app = require('./nox-appserver.js')('template', process.argv[2]);

app.noxApp.page('/login.html', [ './lib/auth.js' ], [ './lib/login.js' ]);
app.noxApp.page('/index.html', [ './lib/auth.js', './lib/app.js' ], 
		[ './lib/index.js' ]);

app.expressServer.use('/', express.static('app'));



