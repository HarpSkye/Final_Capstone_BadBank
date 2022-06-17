var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');
var md5 = require('js-md5');

//var users = [];

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
 app.use(express.json());
app.use(express.raw());
const token = 'aaa-bbb-ccc';

// login user
app.post('/accounts/login', function (req, res, next) {
    const passwordHash = md5(req.body.password);
    dal
        .checkLogin(req.body.email, passwordHash)
        .then((response) => {
            res.send({
                id: response._id,
                name: response.name,
                email: response.email,
                token,
                isAdmin: response.isAdmin,
                balance: response.balance
            });
        })
        .catch(() => {
            next('login failed');
        });
});


// create user account with dal
app.post('/accounts', function(req, res){
    if (req.body.name && req.body.email && req.body.password) {
    // else create user
        req.body.password = md5(req.body.password);
        dal.createUser(req.body).
            then((user) => {
                res.send(user);
            });
    }
});

// all accounts
app.get('/accounts', async function(req, res, next){

            dal.all()
                .then ((docs) => {
                    res.send(docs);
                });

});

app.delete('/accounts', async (req, res, next) => {
    try {
        const userId = req.body.id;
        if(!userId) throw new Error('User cannot be authenticated');
        const _isAdmin = await dal.isAdmin(userId);

        if(_isAdmin) {
            dal.deleteAllUsers()
            .then(() => {
                res.send('Success');
            })
            .catch(err => {
                next(err);
            });
        }
        else throw new Error('User does not have permission');
    } catch (e) {next(e)}
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

app.get('/accounts/:id/toggleAdmin', (req, res, next) => {
    dal.toggleAdmin(req.params.id)
        .then((bool) => {
            res.send({ isAdmin: bool });
        })
        .catch(err => {
            next(err);
        })
})

// deposit route
app.post('/accounts/:id/deposit', async (req, res, next) => {
    const id = req.params.id;
    const depositAmount = req.query.amount;
    if(!(depositAmount > 0)) next('Deposit must be greater than 0');
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

var port = process.env.PORT || 3001;
app.listen(port, () => console.log('Running on port: ' + port));