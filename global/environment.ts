export const SERVER_PORT: number = Number( process.env.PORT ) || 3000;

export let URL_DB: string;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

if ( process.env.NODE_ENV === 'dev' ) {
    URL_DB = 'mongodb://localhost/covid';
} else {
    URL_DB = 'mongodb+srv://aldair:U87sJjtcdl8YHbge@apipuerta-fcejs.mongodb.net/covid';
}

console.log(URL_DB);
