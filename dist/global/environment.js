"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_PORT = Number(process.env.PORT) || 3000;
if (process.env.NODE_ENV === 'dev') {
    exports.URL_DB = 'mongodb://localhost/puertadb';
}
else {
    exports.URL_DB = 'mongodb+srv://aldair:U87sJjtcdl8YHbge@apipuerta-fcejs.mongodb.net/covid';
}
