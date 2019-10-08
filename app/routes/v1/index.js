const express = require("express");
router = express.Router();

const ROUTE_V1_PATH = APP_ROUTE_PATH + "v1/";

router.use("/find-size", require(ROUTE_V1_PATH + "find-size"));

module.exports = router;