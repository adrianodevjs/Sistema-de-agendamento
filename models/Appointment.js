const mongoose = require('mongoose');

const appointement = new mongoose.Schema({
    name: String,
    email: String,
    description: String,
    cpf: String,
    date: Date,
    time: String
});

module.exports = appointement;