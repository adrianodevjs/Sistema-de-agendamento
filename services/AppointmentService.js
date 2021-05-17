var appointement = require('../models/Appointment')
var mongoose = require('mongoose');
var AppointmentFactory = require('../factories/AppointmentFactory');

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

    async GetAll(showFinished){
        if(showFinished){
            return await Appo.find();
        }else{
            var appos = await Appo.find({'finished': false});
            var appointments = [];

            appos.forEach(appointment => {
                if(!appointement.date){
                    appointments.push(AppointmentFactory.Build(appointment))
                }
            });

            return appointments;
        }
    }

}

module.exports = new appointementService();