const PlayersSchema = require("../model/dbmodel");

const getallPlayer = async (req, res) => {
  try {
    const players = await PlayersSchema.find({});
    res
      .status(200)
      .json({ players, success: true, msg: "get all players successful" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }

  // res.status(200).json({
  //   name: "Meer",
  //   age: "21",
  //   totalMedals: "50",
  //   designation: "International Champion",
  //   rating: "4",
  // });
};

const createPlayers = async (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + "/images/" + sampleFile.name;

  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    res.send("File uploaded!");
  });

  try {
    const player = await PlayersSchema.create(req.body);
    res
      .status(201)
      .json({ player, success: true, msg: "player created successful" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
  // console.log(req);
};

const getSinglePlayer = async (req, res) => {
  try {
    const { id: playerId } = req.params;
    const player = await PlayersSchema.findOne({ _id: playerId });

    if (!player) {
      return res
        .status(404)
        .json({ msg: `no player with this Id :${playerId}` });
    }
    res
      .status(200)
      .json({ player, success: true, msg: "get single player successful" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const { id: playerId } = req.params;
    const player = await PlayersSchema.findOneAndUpdate(
      { _id: playerId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!player) {
      return res.status(404).json({ msg: `no player with Id :${playerId}` });
    }
    res
      .status(200)
      .json({ player, success: true, msg: "player updated successful" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const { id: playerId } = req.params;

    const player = await PlayersSchema.findOneAndDelete({ _id: playerId });
    if (!player) {
      return res
        .status(404)
        .json({ msg: `no player with Id :${playerId} hence cannot delete` });
    }
    res
      .status(200)
      .json({ player, success: true, msg: "player deleted successful" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getallPlayer,
  getSinglePlayer,
  createPlayers,
  updatePlayer,
  deletePlayer,
};

// https://gym-players-api.herokuapp.com/api/v1/players
