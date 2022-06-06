// const {resolve} = require('path');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected successfully to db server');

    // connect to myproject database
    db = client.db('myproject');
});

// create user account
function createUser(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result){
            err ? reject(err) : resolve(doc);
        });
    })
}

// check login
function checkLogin(email, passwordHash) {
    return new Promise((resolve, reject) => {
        try {
            const collection = db
                .collection('users')
                .findOne({email, password: passwordHash}, (err, result) => err ? reject(err) : resolve(result));
        } catch(e) {

        }
    })
}

// all users
function all(){
    return new Promise((resolve, reject) => {
        const customers = db   
            .collection('users')
            .find({})
            .toArray(function(err, docs){
                err ? reject(err) : resolve(docs);
            });
    })
}

const deleteAllUsers = async () => {
    return await db.collection('users').deleteMany({});
}

const getAccount = id => {
    return new Promise((resolve, reject) => {
        try {
            db.collection('users')
                .findOne({_id: new mongodb.ObjectID(id)}, (err, result) => err ? reject(err) : resolve(result))
        } catch(err) {
            reject(err);
        }
    })
}

const updateBalance = async (id, balance) => {
    const result = await db.collection('users')
        .updateOne(
            {_id: new mongodb.ObjectID(id)},
            {
                $set: {
                    balance,
                },
            },
        )
    return result;
}

const withdraw = async (id, amount) => {
        const account = await getAccount(id);
        const newBalance = (account.balance * 1) - (amount * 1);
        if (account.balance >= amount) {
            await updateBalance(id, newBalance);
            return newBalance;
        }
        else throw new Error('Balance lower than withdrawal');
}

const deposit = async (id, amount) => {
    const account = await getAccount(id);
    const newBalance = (account.balance * 1) + (amount * 1)
    await updateBalance(id, newBalance);
    return newBalance
}

module.exports = {createUser, checkLogin, all, deleteAllUsers, getAccount, withdraw, deposit};