const express = require("express");
const router = express.Router();

const { decodeUrl } = require("../controllers/index");

router.route("/:code").get(decodeUrl);

module.exports = router;
