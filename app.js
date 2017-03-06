var express = require('express'),
    parser = require('rss-parser'),
    isUrl = require('is-url');

var app = express();
app.use(express.static('static/'));     //static middleware which will serve React app


// the API route to get new feeds
app.get('/feed', function(req, res) {
    
    //check whether URL provided is valid
    if(!req.query || !req.query.url || !isUrl(req.query.url)) {
        res.writeHead(400, {'content-type': 'application/json'});
        res.write(JSON.stringify({status: 400, message: "Invalid RSS feed URL"}));
        res.end();
        return;
    }
    
    parser.parseURL(req.query.url, function(err, parsed) {
        if(err) {
            res.writeHead(500, {'content-type': 'application/json'});
            res.write(JSON.stringify({status: 500, message: err}));
            res.end();
            return;
        }
        
        res.writeHead(200, {'content-type': 'application/json'});
        res.write(JSON.stringify({status: 200, feed: parsed.feed}));
        res.end();
    });
});

app.listen(8080);