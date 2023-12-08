const express = require("express");
const router = express.Router();
const { register, login, check } = require("../controller/userController");
const middleware = require("../middleware/authMiddleWare")

router.post("/register", register);

router.post("/login", login);

router.get("/check",middleware,check);

module.exports = router;