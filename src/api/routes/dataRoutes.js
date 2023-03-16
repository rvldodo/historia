const router = require("express").Router();
const Data = require("../controller/dataController");
const Middleware = require("../middleware/jwtMiddleware");

router.get("/data", Middleware.tokenVerify, Data.getAllData);

router.get("/data/:id", Middleware.tokenVerify, Data.getDataById);

module.exports = router;
