const express = require("express");
const app = express();
const routes = require("./routes/routes");
const notfound = require("./middleware/notfound");
const multer = require("multer");
const connectDb = require("./db/connect");
require("dotenv").config();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

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
