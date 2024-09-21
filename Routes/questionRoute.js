const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { askquestions,getquestions } = require('../controller/questionController');


router.post("/", authMiddleware,askquestions);
router.get("/", authMiddleware,getquestions);

module.exports = router;

