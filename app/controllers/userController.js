var mongoose = require('mongoose');
var User = require('../models/user');

const EventEmitter = require('events');
const emitter = new EventEmitter();

//AddUser controller, with promise
module.exports.addUser = function(req, res) {
    console.log("Adding a new user ....");
    var newUser = new User();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.save()
        .catch(err => {
            console.log("error " + err);
        })
        .then(r => {
            res.json(newUser);
        });
}

//List all users Controller, with promise
module.exports.getAllUsers = function(req, res) {
    console.log("Displaying all users ....");
    User.find()
        .catch(err => { 
            console.log("error " + err); 
        })         
        .then(users => {
            res.json(users);
        });
}

// Delete a user by his email controller, with promise
module.exports.deleteUser = function(req, res) {
    console.log("Deleting a user ....");
    User.findOneAndRemove({ email: req.body.email })
        .catch(err => {
            res.send(500, { error: err });
        })
        .then(r => {
            res.send("succesfully deleted");
        });
}

// Delete all users controller, with promise
module.exports.deleteAllUsers = function(req, res) {
    console.log("Deleting all users ....");
    User.remove()
    .catch(err => {
        res.send(500, { error: err });
    })
    .then(r => {
        res.send("succesfully deleted");
    });
}

//EventEmitter example for updating user
emitter.on('userUpdated', function(){
    console.log('User has been updated, please refresh the list.');
});


// Update user controller, with promise
module.exports.updateUser = function(req, res) {
    console.log("Updating user ...");
    var query = {'_id':req.body.id};
    User.findOneAndUpdate(query, req.body, {upsert:true})
    .catch(err =>{
        res.send(500, { error: err });
    })
    .then(r => {
        emitter.emit('userUpdated');
        res.send("succesfully updated");
    });
}
