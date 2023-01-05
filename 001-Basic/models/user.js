const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this).then(result => console.log(result)).catch(err => console.log(err));
    }

    static findById(userId) {
        const db = getDb();
        const user_id = new ObjectId(userId);
        return db.collection('users').findOne({
            _id: user_id
        }).then(user => {
            console.log(user);
            return user;
        }).catch(err => console.log(err));
    }
}

module.exports = User;