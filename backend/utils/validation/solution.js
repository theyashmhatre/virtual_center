const { isEmptyObject } = require("../utils");

function createSolutionValidation(req, res) {
  const { challengeId, solutionTitle, solutionDescription } = req.body;

  const errors = {};

  if (!challengeId) errors.challengeId = "Challenge ID cannot be empty";

  if (!res.req.user.user_id) {
    errors.main = "Something went wrong. Please try again.";
    errors.devError = "No userId found in request";
  }

  if (!solutionTitle) errors.solutionTitle = "Solution Title cannot be empty";

  if (!solutionDescription) errors.solutionDescription = "Description cannot be empty";

  // if (!req.file || !req.file.originalname.match(/\.(doc|DOC|docx|DOCX|pptx|PPTX|pdf|PDF)$/)) errors.attachment = "Please choose a valid Word, PPT or PDF attachment for solution";


  return {
    errors,
    isValid: isEmptyObject(errors),
  };
}

module.exports = createSolutionValidation;
