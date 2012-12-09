var h5bp = require('h5bp');
var express = require('express');
var fs= require('fs');

var app = express.createServer();

app.configure(function() {
  
  // h5bp server config
  app.use(h5bp.ieEdgeChromeFrameHeader());
  app.use(h5bp.protectDotfiles());
  app.use(h5bp.blockBackupFiles());
  app.use(h5bp.removePoweredBy());
  app.use(h5bp.crossDomainRules());
  app.use(h5bp.suppressWww(true));
  app.use(h5bp.removeEtag());
  
  // ... put your other stuff here ...
  
  // Always keep app.router last
  app.use(app.router);

});

app.get('/', function(req, res) {
   res.send(fs.readFileSync('index.html', 'utf-8'));
});

app.listen(3000);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

