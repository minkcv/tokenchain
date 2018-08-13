var mongoose = require('mongoose')
var Schema = mongoose.Schema
var UserSchema = new Schema({
    name: String,
    token: String,
    data: Number
})

module.exports = mongoose.model('User', UserSchema)
