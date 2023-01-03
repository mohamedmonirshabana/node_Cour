const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://medo:ASD-123456@cluster0.wongn.mongodb.net/ShopDB')
        .then(client => {
            console.log('Connected');
            _db = client.db();
            callback();
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No DB Found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;