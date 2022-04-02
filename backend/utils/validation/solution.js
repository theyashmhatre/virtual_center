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

  return {
    errors,
    isValid: isEmptyObject(errors),
  };
}

module.exports = createSolutionValidation;
