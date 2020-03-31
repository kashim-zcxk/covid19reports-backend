"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_PORT = Number(process.env.PORT) || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
if (process.env.NODE_ENV === 'dev') {
    exports.URL_DB = 'mongodb://localhost/[dbname]';
}
else {
    exports.URL_DB = 'mongodb+srv://[name]:U87sJjtcdl8YHbge@apipuerta-fcejs.mongodb.net/[dbname]';
}
console.log(exports.URL_DB);
