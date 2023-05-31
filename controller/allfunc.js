const PlayersSchema = require("../model/dbmodel");
const Address = require('../model/competitionModel')

const getallPlayer = async (req, res) => {
  console.log("rfr")
  try {
    // const players = await PlayersSchema.find({}).populate('address', { city: 1 });
    const players = await PlayersSchema.aggregate([
      {
        $lookup: {
          from: "addresses",
          localField: "address",
          foreignField: "_id",
          as: "addressInfo"
        }
      }, {
        $unwind:
          "$addressInfo"

      }, {
        $project: {
          _id: 0,
          name: 1,
          address: 1
        }
      }
    ])
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
const getallPlayerAddr = async (req, res) => {
  console.log("rfr")
  try {
    const address = await Address.find();
    res
      .status(200)
      .json({ address, success: true, msg: "get all players address successful" });
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
  console.log("create");
  console.log("reqbody", req.body)
  try {
    const addreArray = []
    const { address1, address2, ...other } = req.body
    const addr = new Address(address1)
    const addr2 = new Address(address2)
    const finalsave = await addr.save().then(resp => addreArray.push(resp._id))
    const finalsave2 = await addr2.save().then(resp => addreArray.push(resp._id))

    console.log("final", addreArray);
    // const addAr=addreArray.push(finalsave._id)
    const player = await PlayersSchema.create({ ...other, address: addreArray });
    res
      .status(201)
      .json({ player, success: true, msg: "player created successful" });
    // .json({ success: true, msg: "player created successful" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
  // console.log(req);
};
const createPlayersAddr = async (req, res) => {
  console.log("create");
  console.log("reqbody", req.body)
  try {
    const { address1, address2, ...other } = req.body
    const addr = new Address(address1)
    const addr2 = new Address(address2)
    const finalsave = await addr.save()
    const finalsave2 = await addr2.save()
    res
      .status(201)
      .json({ finalsave, success: true, msg: "player address created successful" });
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

const getSinglePlayerAddr = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Address.findOne({ _id: id });

    if (!player) {
      return res
        .status(404)
        .json({ msg: `no player addr with this Id :${playerId}` });
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
  getallPlayerAddr,
  getSinglePlayer,
  getSinglePlayerAddr,
  createPlayers,
  createPlayersAddr,
  updatePlayer,
  deletePlayer,
};

// https://gym-players-api.herokuapp.com/api/v1/players
