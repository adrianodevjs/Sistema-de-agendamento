var appointement = require('../models/Appointment')
var mongoose = require('mongoose');
var mailer = require('nodemailer');
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
           finished: false,
           notifield: false
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

    async SendNotification(){
        var appos = await this.GetAll(false);
        var transporter = mailer.createTransport({
            host: 'smtp.mailtrap.io',
            post: 25,
            auth: {
                user: '43a1c6a4e1f170',
                pass: '2fb61d953b11f3'
            }
        });

        appos.forEach(async app => {
            var date = app.start.getTime();
            var hour = 1000 * 60 * 60;
            var gap = date - Date.now();

            if(gap <= hour){
                if(!app.notifield){
                    await Appo.findByIdAndUpdate(app.id, {notifield: true});

                    transporter.sendMail({
                        from: 'Gunter <ggunter.dev@gmail.com>',
                        to: app.email,
                        subject: 'Não esqueça sua consulta!',
                        text: 'Sua consulta vai acontecer daqui à 1hr.'
                    }).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    });
                } 
            }
        });
    }

}

module.exports = new appointementService();
