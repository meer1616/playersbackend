const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require('cookie-parser')
const app = express();
const routes = require("./routes/routes");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const notfound = require("./middleware/notfound");
const connectDb = require("./db/connect");
const mail = require("./controller/mailController");
const cors = require('cors')
require("dotenv").config();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))    // enables to send form data also
app.use(cookieParser())
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use("/api/v1/players", routes);
app.use("/api/v1/users", authRoutes);
app.use("/api/v1/chat", chatRoutes);
// app.use("/api/v1/competition", routes);
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
