export const SERVER_PORT: number = Number( process.env.PORT ) || 3000;

export let URL_DB: string;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

if ( process.env.NODE_ENV === 'dev' ) {
    URL_DB = 'mongodb://localhost/[dbname]';
} else {
    URL_DB = 'mongodb+srv://[name]:U87sJjtcdl8YHbge@apipuerta-fcejs.mongodb.net/[dbname]';
}

console.log(URL_DB);
