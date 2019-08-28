const moongose = require('mongoose');
const ObjectId = moongose.Schema.Types.ObjectId;

const serviceSchema = new moongose.Schema({
    car_id: ObjectId,
    name: String,
    date: String
})

module.exports = moongose.model('Service', serviceSchema);