const express = require("express");
const router = express.Router();



const {create} = require("../controllers/respondes.js");

router.post("/upload", create);



module.exports = router