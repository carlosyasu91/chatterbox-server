/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var storage = {
  results:[]
};

var http = require("http");
var requestHandler = function(request, response) {
  var msg = [];
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";
  var info = '';
  var statusCode;
  if(request.method == "POST") {
    statusCode = 201;
  }
  if(request.method == "GET"){
    statusCode = 200;
    if(request.url !== "/classes/messages" && request.url.slice(0, 13) !== "/classes/room"){
      statusCode = 404;
      console.log('our url', request.url);
      response.writeHead(statusCode, headers);
      response.end();
    } 
  }
  request.on('data', function(data){
      if(data !== undefined){  
        info += data;
        storage.results.push(JSON.parse(info));
      }
  });
  response.writeHead(statusCode, headers);  
  // request.on('end', function(){
  response.end(JSON.stringify(storage));
  // });
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;
