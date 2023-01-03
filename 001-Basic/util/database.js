const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://medo:ASD-123456@cluster0.wongn.mongodb.net/ShopDb')
        .then(client => {
            console.log('Connected');
            callback(client);
        }).catch(err => {
            console.log(err);
        });
};

module.exports = mongoConnect;
//mongosh "mongodb+srv://cluster0.wongn.mongodb.net/ShopDB" --apiVersion 1 --username medo