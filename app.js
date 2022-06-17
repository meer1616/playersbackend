const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const routes = require("./routes/routes");
const notfound = require("./middleware/notfound");
const connectDb = require("./db/connect");
const mail = require("./controller/mailController");
const cors = require('cors')
require("dotenv").config();
app.use(cors())
app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use("/api/v1/players", routes);
app.use("/api/v1/portfoliomail", require("./routes/mail"));
app.use(notfound);
const port = process.env.PORT || 4000;

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
