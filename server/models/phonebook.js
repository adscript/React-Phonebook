var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pbSchema = new Schema({
    id: {
        type: Number,
        default: Date.now()
    },
    name: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        match: new RegExp("^(08[0-9]{8,11})$"),
        require: true,
    },
});

module.exports = mongoose.model('Chat', pbSchema);