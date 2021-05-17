var appointement = require('../models/Appointment')
var mongoose = require('mongoose');

const Appo = mongoose.model('Appointment', appointement);

class appointementService{
    async Create(name, email, description, cpf, date, time){
        var newApp = new Appo({
           name,
           email,
           description,
           cpf,
           date,
           time,
           finished: false
        });
        try{
            await newApp.save();
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

}

module.exports = new appointementService();
