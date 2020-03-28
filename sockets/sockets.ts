import Server from '../classes/server';
import * as controller from '../controller/country_controller';

const server = Server.instance;
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

export const updateRanking = () => {
    controller.getAllCountries((err: any, countries: any) => {
        if ( !err ) {
            server.io.emit('newCases', countries);
        }
    });
}

export const updateGlobalCases = () => {
    controller.getGlobalCases((err: any, global: any) => {
        if ( ! err ) {
            server.io.emit('globalCases', global);
        }
    });
}

export const updateLatesCases = () => {
    controller.getLatestCases((err: any, cases: any) => {
        if ( !err) {
            server.io.emit('latestCases', cases);
            updateOneCountry(cases[0]);
        }
    })
}

export const updateOneCountry = (newCase: any) => {
    controller.getOneCountry(newCase.country_name, (err: any, country: any) => {
        if ( !err) {
            let subscriptions = country.subscriptions;
            for ( let i = 0; i < subscriptions.length; i++ ) {
                let mailOptions = configEmail(newCase.country_name, subscriptions[i], newCase);
                sendEmail(mailOptions);
            }
            server.io.emit(`country${newCase.country_name}`, country);
        }
    });
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'noreply.covidreports@gmail.com',
      pass: 'covidreports11'
    }
});

function configEmail(country: string, email: string, newCase: any){
    const token = jwt.sign( { country, email }, 'seed', { expiresIn: '1year' });

    const url = `https://covid19-reports.herokuapp.com/cancel/${token}`;

    const mailOptions = {
        from: 'noreply.sectec@gmail.com',
        to: email,
        subject: `Reporte de nuevos casos sobre COVID-19 para ${ country }`,
        html: 
        `
            <p> Nuevos casos: <strong>${ newCase.new_cases } </strong> </p> 
            <p> Total: ${ newCase.total_cases } </p>
            <p> Fecha: ${ new Date(newCase.date).toLocaleString() } </p>
            <p> Para dejar de recibir mensajes como este, haz clic en el siguiente link: <a href="${ url }"> ${ url } </a></p>
        `
    };

    return mailOptions;
}

function sendEmail(mailOptions: any) {
    transporter.sendMail(mailOptions, function(error: any, info: any){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
