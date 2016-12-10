var http = require('http');
var url = require('url');
var fs = require('fs');
var nodeFinder = require('./lib/nodeFinder.js');
var intial = require('./data/initial.js');

this.server = http.createServer(function(req, res) {
  if (req.url === '/') {
    fs.readFile('./views/index.html', {encoding: 'utf8'}, function(err, page){
      res.writeHead(200);
      res.end(page);
    });
  } else if (req.url === '/nodes/new') {
    var whole = "";
    res.on("data", (chunk) => {whole += chunk.toString();});
    res.on("end", () => {
      var updatedHistory = nodeFinder.updateWithNextNode(whole);
      req.writeHead(200);
      req.end(updatedHistory);
    });
  } else if  (req.url === '/public/application.js') {
    fs.readFile('./public/application.js', {encoding: 'utf8'}, function(err, page){
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.end(page);
    });
  } else if  (req.url === '/public/styles.css') {
    fs.readFile('./public/styles.css', {encoding: 'utf8'}, function(err, page){
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(page);
    });
  } else if  (req.url === '/public/cytoscape.min.js') {
    fs.readFile('./public/cytoscape.min.js', {encoding: 'utf8'}, function(err, page){
      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.end(page);
    });
  } else if (req.url === '/initial') {
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(intial));
      res.end();
  } else if (req.url === '/img/completed') {
    fs.readFile('./img/completed.png', function(err, img){
      res.writeHead(200);
      res.end(img);
    });
  } else if (req.url === '/img/locked') {
    fs.readFile('./img/locked.png', function(err, img){
      res.writeHead(200);
      res.end(img);
    });
  } else if (req.url === '/img/inprogress') {
    fs.readFile('./img/inProgress.png', function(err, img){
      res.writeHead(200);
      res.end(img);
    })
  } else if (req.url === '/img/backgroundImage') {
    fs.readFile('./img/backgroundImage.png', function(err, img){
      res.writeHead(200);
      res.end(img);
    })
  } else if (req.url === '/signin') {
    fs.readFile('./views/signin.html', {encoding: 'utf8'}, function(err, page){
    res.writeHead(200);
    res.end(page);
  });
  } else {
    res.writeHead(404);
    res.end();
  }
});

exports.listen = function(){
  this.server.listen.apply(this.server, arguments);
};

exports.close = function(callback) {
  this.server.close(callback);
};
