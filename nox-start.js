var app = require('./nox-appserver.js')('template', 'html', process.argv[2]);

app.noxapp.page('/login.html', [ './lib/auth.js' ], [ './lib/login.js' ]);
app.noxapp.page('/index.html', [ './lib/auth.js', './lib/app.js' ], 
		[ './lib/index.js' ]);



