const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const clientSchema = new Schema({
    firstName :{
        type: String,
        required: true
    },
    lastName :{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    deviceType:{
        type: String,
        required: true
    }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;