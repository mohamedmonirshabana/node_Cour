const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongosh "mongodb+srv://cluster0.wongn.mongodb.net/ShopDB" --apiVersion 1 --username medo')
        .then(client => {
            console.log('Connected');
            callback(client);
        }).catch(err => {
            console.log(err);
        });
};

module.exports = mongoConnect;