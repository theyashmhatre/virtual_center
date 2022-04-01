const { isEmptyObject } = require("../utils");

function createSolutionValidation(req) {
  const { challengeId, userId, ideaTitle, ideaDescription } = req.body;

  const errors = {};

  if (!challengeId) errors.challengeId = "Challenge ID cannot be empty";

  if (!userId) {
    errors.main = "Something went wrong. Please try again.";
    errors.devError = "No userId found in request";
  }

  if (!ideaTitle) errors.ideaTitle = "Idea Title cannot be empty";

  if (!ideaDescription) errors.ideaDescription = "Description cannot be empty";

  return {
    errors,
    isValid: isEmptyObject(errors),
  };
}

module.exports = createSolutionValidation;
