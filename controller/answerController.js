const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function answer(req, res) {
  const { answerid, userid, questionid, answer } = req.body;

  // Check if any required fields are missing
  if (!answerid || !userid || !questionid || !answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please fill in all fields." });
  }

  try {
    // Check if questionid already exists in the database
    const [existingAnswer] = await dbConnection.query(
      "SELECT answerid FROM questions WHERE questionid = ?",
      [answeridid]
    );

    if (existingAnswer) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          msg: "Answer ID already exists. Please choose a different one.",
        });
    }

    if (answer.length > 50) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please limit your description to 50 characters." });
    }

    await dbConnection.query(
      "INSERT INTO answers (answerid, userid, questionid,answer) VALUES (?, ?, ?, ?)",
      [answerid, userid, questionid, answer]
    );

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Answer added successfully." });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong. Please try again later." });
  }
}

module.export = { answer };
