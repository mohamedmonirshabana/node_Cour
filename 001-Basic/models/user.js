const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart; // {items:[]}
        this._id = id ? new ObjectId(id) : null;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this).then(result => console.log(result)).catch(err => console.log(err));
    }

    addToCart(product) {
        // const cartProduct = this.cart.items.findIndex(cp => {
        //     cp._id === product._id;
        // });
        const updatedCart = {
            items: [{
                ...product,
                quantity: 1
            }]
        };
        const db = getDb();
        return db.collection('users').updateOne({
            _id: this._id
        }, {
            $set: {
                cart: updatedCart
            }
        }).then(result => console.log(result)).catch(err => console.log(err));
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