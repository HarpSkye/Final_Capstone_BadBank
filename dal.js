// const {resolve} = require('path');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
let db = null;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected successfully to db server');

    // connect to myproject database
    db = client.db('myproject');
});

// create user account
function createUser(data){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {...data, balance: 0}
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

const getAccount = async id => {
            const user = await db.collection('users')
                .findOne({_id: new mongodb.ObjectID(id)});
            if (!user) throw new Error('No user found for that id');

            return user;
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
        if(!account) throw new Error('Could not find account');
        const newBalance = (account.balance * 1) - (amount * 1);
        if (account.balance >= amount) {
            await updateBalance(id, newBalance);
            return newBalance;
        }
        else throw new Error('Balance lower than withdrawal');
}

const deposit = async (id, amount) => {
    const account = await getAccount(id);
    if(!account) throw new Error('Could not find account');

    const newBalance = (account.balance * 1) + (amount * 1)
    await updateBalance(id, newBalance);
    return newBalance
}

const isAdmin = async (id) => {
    const account = await getAccount(id);
    if(!account) throw new Error('Could not find account');
    return account.isAdmin;
}

const toggleAdmin = async (id) => {
    const _isAdmin = await isAdmin(id);

    const bool = !_isAdmin;

    const result = await db.collection('users')
        .updateOne(
            {_id: new mongodb.ObjectID(id)},
            {
                $set: {
                    isAdmin: bool
                },
            },
        )
    
    return bool;
}

module.exports = {createUser, checkLogin, all, deleteAllUsers, getAccount, withdraw, deposit, isAdmin, toggleAdmin};