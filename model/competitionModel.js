const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true,
    },
    player: {
        type: mongoose.Schema.Types.ObjectId, ref: "PlayersModel"
    }
})


module.exports = mongoose.model('address', addressSchema)