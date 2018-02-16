var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var server;
var port = 3000;
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/lab5com');

var user = require('./app/controllers/userController');

// Redirection to index.html
app.get('/', function (req, res) {
     res.sendfile('index.html');
});

// List all users GET
app.get('/listUsers', function (req, res) {
		user.getAllUsers(req, res);
});

// Update a user infos PUT
app.put('/updateUser', function(req, res){
	user.updateUser(req, res);
});

// Add new user (firstName, lastName and email) POST
app.post('/addNewUser', function (req, res) {
	user.addUser(req, res);
});

// Delete a user by his email DELETE
app.delete('/deleteUser', function (req, res) {
		user.deleteUser(req, res);
});

// Delete all users DELETE
app.delete('/deleteAllUsers', function (req, res) {
		user.deleteAllUsers(req, res);
});

app.listen(port, function () {
     console.log('Server is listening on', port);
}); 
