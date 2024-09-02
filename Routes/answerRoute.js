const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get("/all-answers", authMiddleware, (req, res) => {
  res.send("All answers");
});

module.exports = router;