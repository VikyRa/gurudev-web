const mongoose = require('mongoose');
// 'mongodb://localhost:27017/alo'
const db = mongoose.connect(process.env.ONLINE_DB_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connected Successfully'))
    .catch((err) => console.error(`Not Connected ${err}`));

module.exports = db;