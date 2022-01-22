const mongoose = require('mongoose');
// const {boolean} = require('webidl-conversations');


const OrderSchema = new mongoose.Schema({
    userID:{type: 'String', required: true},
    products: [
        {
            productID: {type: 'String'},
            quantity: {type: 'Number', default:1,},
        }
    ],
    amount: {type: 'Number', required: true},
    address: {type: 'String', required: true},
    status: {type: 'String', default: 'pending'},
},
    {timestamps: true,}
);

module.exports = mongoose.model("Order", OrderSchema)