Nox Application Template
===

This project is an easy and simple template for getting a Nox.js app up and running in Node.js. It includes login and main pages to start building upon.

Directory Structure
--

`html` - includes all static files
`lib` - includes all client and server JavaScript modules

Getting Started
--

The application is ready to run like this:

```
node ./nox-appserver.js [<port>]
```

After this, you can go to `localhost:<port>/login.html` and login using credentials `username` and `usernamepass`.

To add modules and pages to your project, please modify `nox-appserver.js` where the pages are added to the app (around line 32):

```javascript
noxapp.page('/login.html', [ './lib/auth.js' ], [ './lib/login.js' ]);
noxapp.page('/index.html', [ './lib/auth.js', './lib/app.js' ], [ './lib/index.js' ]);
```

3rd Party Software
--

This project uses the following 3rd party software, included in the `html/` directory:

- jQuery v1.10.2, Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors, see license <a href="http://jquery.org/license">here</a>
- Bootstrap v3.0, Copyright 2013 Twitter, Inc under the Apache 2.0 license, see license <a href="https://github.com/twbs/bootstrap/blob/master/LICENSE">here</a>
- respond.min.js, Copyright 2011: Scott Jehl, scottjehl.com, <a href="http://opensource.org/licenses/mit-license.php">MIT licensed</a>
- html5shiv, see <a href="https://code.google.com/p/html5shiv/">here</a>, <a href="http://opensource.org/licenses/mit-license.php">MIT licensed</a>

License
--

(The MIT License)

Copyright (c) 2013 Antti Saarinen &lt;antti.p.saarinen@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

