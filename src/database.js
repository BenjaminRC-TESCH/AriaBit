const mongoose = require('mongoose');

//const {ARIA_BIT_MONGODB_HOST, ARIA_BIT_MONGODB_PORT,ARIA_BIT_MONGODB_DATABASE} = process.env;
//const MONGODB_URI = process.env.MONGODB_URI;
//const MONGODB_URI = `mongodb://${ARIA_BIT_MONGODB_HOST}/${ARIA_BIT_MONGODB_DATABASE}`;

//local
const MONGODB_URI = 'mongodb://127.0.0.1:27017/aria-bit';

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((db) => console.log('Database connected'))
    .catch((err) => console.log(err));
