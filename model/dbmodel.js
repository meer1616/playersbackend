const mongoose = require("mongoose");

const PlayersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required "],
    trim: true,
    maxlength: [30, "Name cannot be more than 30 char"],
  },
  age: {
    type: String,
    required: [true, "Age should not be empty"],
    // max: 80,
  },
  totalMedals: {
    type: String,
    required: [true, "Please enter total number of Medals"],
    // max: 80,
  },
  designation: {
    type: String,
    required: [true, "Designation is required "],
    trim: true,
  },
  rating: {
    type: String,
    default: 0,
    // required: [true, "Age should not be empty"],
    // max: 80,
  },
  address: [{
    type: mongoose.Schema.Types.ObjectId, ref: "address"
  }]
});

module.exports = mongoose.model("PlayersModel", PlayersSchema);
