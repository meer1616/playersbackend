const express = require("express");
const router = express.Router();

const {
  getallPlayer,
  createPlayers,
  deletePlayer,
  updatePlayer,
  getSinglePlayer, createPlayersAddr, getSinglePlayerAddr, getallPlayerAddr
} = require("../controller/allfunc");

router.route("/addr").get(getallPlayerAddr).post(createPlayersAddr);
router
  .route("/addr/:id")
  .get(getSinglePlayerAddr)


router.route("/").get(getallPlayer).post(createPlayers);
router
  .route("/:id")
  .get(getSinglePlayer)
  .patch(updatePlayer)
  .delete(deletePlayer);



// .patch(updatePlayerAddr)
// .delete(deletePlayerAddr);



module.exports = router;
