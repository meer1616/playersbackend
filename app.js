const express = require("express");
const app = express();
const routes = require("./routes/routes");
const notfound = require("./middleware/notfound");
const connectDb = require("./db/connect");
require("dotenv").config();

app.use(express.json());

app.use("/api/v1/players", routes);
app.use(notfound);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening  at http://localhost:${port}`);
    });
  } catch (error) {
    console.log("error in app", error);
  }
};

start();
