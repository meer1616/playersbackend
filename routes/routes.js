const express = require("express");
const router = express.Router();

const {
  getallPlayer,
  createPlayers,
  deletePlayer,
  updatePlayer,
  getSinglePlayer,
} = require("../controller/allfunc");

router.route("/").get(getallPlayer).post(createPlayers);
router
  .route("/:id")
  .get(getSinglePlayer)
  .patch(updatePlayer)
  .delete(deletePlayer);

module.exports = router;
