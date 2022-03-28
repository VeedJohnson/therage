const {mongoose} = require('../config/mongoose');

const playerSchema = new mongoose.Schema({
    full_name: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    amount: {
        type: Number, 
        required: true,
    },
    reference: {
        type: String, 
        required: true
    }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = {Player}