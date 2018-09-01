var mongoose = require('mongoose')

var Schema = mongoose.Schema

var PartnerSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }
})

module.exports = mongoose.model('Partner', PartnerSchema )
