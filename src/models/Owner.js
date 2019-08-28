const mongoose = require('mongoose')

const ownerSchema = new mongoose.Schema({
    firtName: String,
    lastName: String,
    email: String
})

module.exports = mongoose.model('Owner', ownerSchema);