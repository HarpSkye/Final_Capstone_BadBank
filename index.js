var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');
var md5 = require('js-md5');

//var users = [];

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));

const token = 'aaa-bbb-ccc';

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

// account/login/j@j.com/1234
// account/login?email=j@j.com&password=1234
// login user
app.post('/accounts/login', function (req, res) {
    const passwordHash = md5(req.query.password);
    dal
        .checkLogin(req.query.email, passwordHash)
        .then((response) => {
            res.send({
                id: response._id,
                name: response.name,
                email: response.email,
                token,
            });
        })
        .catch(() => {
            next('login failed');
        });
});

// get one account
// /account/{id}

// create user account with dal
app.post('/accounts', function(req, res){
    if (req.query.name && req.query.email && req.query.password) {
    // else create user
        dal.createUser(req.query.name, req.query.email, md5(req.query.password)).
            then((user) => {
                console.log(user)
                res.send(user);
            });
    }
});

// all accounts
app.get('/accounts', function(req, res){
    dal.all().
        then ((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

app.delete('/accounts', (req, res, next) => {
    dal.deleteAllUsers()
        .then(() => {
            res.send('Success');
        })
        .catch(err => {
            next(err);
        });
});

app.get('/accounts/:id', (req, res, next) => {
    dal.getAccount(req.params.id)
        .then((account) => {
            console.log(account);
            res.send(account)
        })
        .catch(err => {
            next(err);
        })
})

// deposit route
app.post('/accounts/:id/deposit', async (req, res, next) => {
    const id = req.params.id;
    const depositAmount = req.query.amount;

    try {
        const newBalance = await dal.deposit(id, depositAmount);
    
        res.send({id, newBalance});
    } catch(e) {
        next(e)
    }
});

// withdraw route
app.post('/accounts/:id/withdraw', async (req, res, next) =>{
    const id = req.params.id;
    const withdrawAmount = req.query.amount;
    try {
        const newBalance = await dal.withdraw(id, withdrawAmount)
            // return amount withdrawn and remainder
        res.send({
            id,
            newBalance,
            withdrawAmount,
        });
    } catch(e) {
        next(e)
    }
});

// balance route
app.get('/account/balance/:balance/:name/:email/:password', function(req, res){
    res.send({
        balance: req.params.balance,
        amount: req.params.amount,
        email: req.params.string,
        password: req.params.password
    });
});

var port = 3001;
app.listen(port);
console.log('Running on port: ' + port);