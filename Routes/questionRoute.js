const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { askquestion,getquestions } = require('../controller/questionController');


router.post("/questions", askquestion);
router.get("/questions", getquestions);

module.exports = router;


  // router.post("/questions", authMiddleware, async (req, res) => {
  //   const { title, description, questionid, tag } = req.body;
  //   const userid = req.user.userid; 
  
  //   if (!title || !description || !questionid) {
  //     return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide all required fields." });
  //   }
  //   try {
  //     await dbConnection.execute(
  //       'INSERT INTO questions (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)',
  //       [questionid, userid, title, description, tag || null] // Use null if tag is not provided
  //     );
  //     res.status(201).send("Question posted successfully");
  //   } catch (err) {
  //     console.error('Database error:', err);
  //     res.status(500).send("Failed to post question");
  //   }
  // });

  // router.get("/questions", authMiddleware, async (req, res) => {
  //   try {
  //     const [rows] = await dbConnection.execute('SELECT * FROM questions');
  //     res.json(rows);
  //   } catch (err) {
  //     res.status(500).send("Failed to retrieve questions");
  //   }
  // });

  // module.exports = router;
  