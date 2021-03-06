import Server from './classes/server';
import router from './routes/routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import MongoDB from './classes/mongo';

import nodemailer from 'nodemailer';

const server = Server.instance;
import updateDatabase from './services/services';
import { URL_DB } from './global/environment';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail',
      pass: 'yourpassword'
    }
});

export function sendEmail(mailOptions: any) {
    transporter.sendMail(mailOptions, function(error: any, info: any){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

// BodyParser
server.app.use( bodyParser.urlencoded( { extended: true } ) );
server.app.use( bodyParser.json() );

// CORS
server.app.use( cors( {origin: true, credentials: true } ) );

// connect bd
MongoDB.connect(URL_DB);

setInterval(updateDatabase, 3000);

// Rutas
server.app.use('/', router);

server.start(() => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});