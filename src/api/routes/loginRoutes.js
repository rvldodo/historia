const router = require("express").Router();
const Middleware = require("../middleware/jwtMiddleware");

router.post("/", Middleware.authLogin);

module.exports = router;
