var mongoose = require('mongoose')

var Schema = mongoose.Schema

var UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }
})

module.exports = mongoose.model('User', UserSchema )
