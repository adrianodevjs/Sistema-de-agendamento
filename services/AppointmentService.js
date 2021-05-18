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

    async GetById(id){
        try{
            var event = await Appo.findOne({'_id': id});
            return event;
        }catch(err){
            console.log(err);
        }
       
    }

    async Finish(id){
        try{
            await Appo.findByIdAndUpdate(id, {finished: true});
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async Search(query){
        try{
            var appos = await Appo.find().or([{email: query}, {cpf: query}]);
            return appos;
        }catch(err){
            console.log(err);
            return [];
        }
       
    }

}

module.exports = new appointementService();
