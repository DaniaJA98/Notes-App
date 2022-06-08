require('dotenv').config();

const app = require('./app');
require('./database');

// Funcion principal que inicia el programa
async function main() {
    await app.listen(app.get('port'));
    console.log('server on port' , app.get('port'));
}

main();