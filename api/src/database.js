const mongoose = require('mongoose');
// El protocolo mongodb

const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : "mondodb://localhost/databasetest";
// El modulo connect nos permite conectarnos a una instacia
mongoose.connect(URI, {
    useNewUrlParser: true,

});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is connected');
});