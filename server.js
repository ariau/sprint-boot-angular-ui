// Get dependencies
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const cors = require('cors');
const _app_folder = 'dist/bike-ui';

const app = express();

// Parsers for POST data
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '20mb' }));

app.use(cors());

// Point static path to dist
//app.use(express.static(_app_folder));

let options = {
    target: "https://spring-boot-angular-appl.herokuapp.com", //api.example.com 
    changeOrigin: true,
    logLevel: "debug",
    onError: function onError(err, req, res) {
    console.log("Something went wrong with the proxy.", err)
    res.end();
    }
};

// Set our api routes proxy to point to spring boot server (local dev only)
app.use('/api', proxy(options));//only forward calls with '/api'

app.use(express.static(__dirname + '/dist/bike-ui'));

app.get('/*', function(req,res) { 
    res.sendFile(path.join(__dirname+'/dist/bike-ui/index.html'));
});

// Catch all other routes and return the index file
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});

app.listen(process.env.PORT || 8080);

/**
 * Get port from environment and store in Express.
 */
 //const port = '8080';
//app.set('port', port);

/**
 * Create HTTP server.
 */
//const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
//server.listen(process.env.PORT || port, () => console.log(`API running on ${port}`));
