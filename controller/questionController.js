const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");


async function askquestions(req, res) {
  const { questionid, userid, title, description, tag } = req.body;

  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please fill in all fields." });
  }

  try {
    const existingQuestion = await dbConnection.query(
      "SELECT * FROM questions WHERE title = ?",
      [title]
    );

    // Log the raw query result
    console.log("Raw query result:", existingQuestion);

    // Adjusting the check based on the query result structure
    if (existingQuestion[0].length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Question already exists. Please ask a different question.",
      });
    }

    if (title.length > 100) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please limit your title to 10 characters." });
    }

    if (description.length > 600) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please limit your description to 50 characters." });
    }

    await dbConnection.query(
      "INSERT INTO questions (userid, title, description, tag) VALUES (?, ?, ?, ?)",
      [userid, title, description, tag] // Removed questionid since it's auto-increment
    );

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Question added successfully." });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong. Please try again later." });
  }
}

async function getquestions(req,res){
  try{
    const questions=await dbConnection.query("SELECT * FROM questions");
      return res.status(StatusCodes.OK).json(questions);
  }
  
  catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong. Please try again later." });
  }
}

module.exports = { askquestions,getquestions };
