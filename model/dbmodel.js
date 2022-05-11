const mongoose = require("mongoose");

const PlayersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required "],
    trim: true,
    maxlength: [30, "Name cannot be more than 30 char"],
  },
  age: {
    type: Number,
    required: [true, "Age should not be empty"],
    // max: 80,
  },
  // imageUrl: {
  //   type: String,
  //   required: [true, "Image is required "],
  // },
  totalMedals: {
    type: Number,
    required: [true, "Please enter total number of Medals"],
    // max: 80,
  },
  designation: {
    type: String,
    required: [true, "Designation is required "],
    trim: true,
  },
  rating: {
    type: Number,
    default: 0,
    // required: [true, "Age should not be empty"],
    // max: 80,
  },
});

module.exports = mongoose.model("PlayersModel", PlayersSchema);
