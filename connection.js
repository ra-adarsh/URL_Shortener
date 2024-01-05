const mongoose = require("mongoose");

async function connectMongoDB(link) {
    return mongoose.connect(link);
}

module.exports = {
    connectMongoDB,
};