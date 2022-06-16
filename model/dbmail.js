const mongoose = require("mongoose");



const MailData = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required "],
        trim: true,
        // maxlength: [30, "Name cannot be more than 30 char"],
    },
    email: {
        type: String,
        required: [true, "email is required "],
        // max: 80,
    },
    description: {
        type: String,
        required: [true, "description is required "],
        // max: 80,
    },

})



module.exports = mongoose.model("MailData", MailData);
