const mongoose = require('mongoose');

async function connectToMongo(url){
    await mongoose.connect(url);
}

module.exports = {
    connectToMongo
};