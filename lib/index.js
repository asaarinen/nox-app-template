var auth = require('./auth.js');
var app = require('./app.js');

$(document).ready(function() {
    auth.getUserName(function(err, username) {
	if( !err && username ) { 
	    $('p.navbar-text').text('Logged in as ' + username);
	} else
	    window.location.href = '/login.html';
    });
});
