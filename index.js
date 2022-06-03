var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');

//var users = [];

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

/* app.get('/login', function(req, resp){
    // do a thing
    // req -> { username: ....., password: ..... };
    // get login information -- this is complex. we'll get here in a minute
    // return resp -> jwt, access token 
}) */
// create user account
// user enters info in form, clicks submit
// browser makes options request to server.com/account/create
// options comes back successful
// browser makes GET request to server.com/account/create with payload {name: ..., email:...., password: ... ////}
/* app.post('/account/create/:name/:email/:password', function(req, res){
    // req = {name, email, password}
    // creates account
    // sends back account info

    const { name, email, password } = req.params;

    // open db connection
    // add account to db

    res.send({
        name:   req.params.name,
        email:  req.params.email,
        password: req.params.password
    });
});
 */

// create user account with dal
app.get('/account/create/:name/:email/:password', function(req, res){
    // else create user
    dal.create(req.params.name, req.params.email, req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});

// login user
app.get('/account/login/:name/:email/:password', function (req, res) {
    res.send({
        email:    req.params.string,
        password: req.params.password
    });
});

// all accounts
app.get('/account/all', function(req, res){
    dal.all().
        then ((docs) => {
            console.log(docs);
            res.send(docs);
        })
    });

// deposit route
app.get('/account/deposit/:amount/:name/:email/:password', function(req, res){
    res.send({
        amount: req.params.amount,
        email: req.params.string,
        password: req.params.password
    });
});

// withdraw route
app.get('/account/withdraw/:amount/:name/:email/:password', function(req, res){
    res.send({
        amount: req.params.amount,
        email: req.params.string,
        password: req.params.password
    })
})

// balance route
app.get('/account/balance/:balance/:name/:email/:password', function(req, res){
    res.send({
        balance: req.params.balance,
        amount: req.params.amount,
        email: req.params.string,
        password: req.params.password
    })
})

var port = 3001;
app.listen(port);
console.log('Running on port: ' + port);