const mongoose = require("mongoose");

const connectDb = (url) => {
  console.log("url", url);
  // oldone // MONGO_URI=mongodb+srv://meerPatel:KSP135246@playersdb.8wlqf.mongodb.net/myFirstDatabase?palyersDatabase=true&w=majority

  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected Successfully");
    })
    .catch((err) => {
      console.log("connection error ", err);
    });
};

module.exports = connectDb;
