const { isEmptyObject } = require("../utils");

function createChallengeValidation(req, res) {
  const {
    challengeTitle,
    challengeDescription,
    endDate,
    tags,
    cloudProvider,
    supportingMedia,
    reward,
  } = req.body;

  const errors = {};

  if (!challengeTitle) errors.challengeTitle = "Challenge name cannot be empty";

  if (!challengeDescription)
    errors.challengeDescription = "Description cannot be empty";

  if (res.req.user.role !== "admin") { 
    errors.main = "Only admins are allowed to post a challenge"; 
    errors.devMsg = "User is not an admin"; 
  }

  if (!res.req.user.user_id) {
    errors.main = "Something went wrong. Please try again.";
    errors.devMsg = "No userId found in request";
  }

  if (!endDate)
    errors.endDate = "Please choose a valid end date for challenge.";

  if (!tags) errors.tags = "You must enter atleast 1 tag";

  if(!cloudProvider) errors.cloudProvider = "Please select a valid cloud provider";

  if (!req.file || !req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) errors.challengeImage = "Please choose a valid cover image for challenge";

  return {
    errors,
    isValid: isEmptyObject(errors),
  };
}

function editChallengeValidation(req, res) {
  const {
    challengeTitle,
    challengeDescription,
    endDate,
    status,
    supportingMedia,
    reward,
  } = req.body;

  const errors = {};

  if (!challengeTitle)
    errors.challengeTitle = "Challenge title cannot be empty";

  if (!challengeDescription)
    errors.challengeDescription = "Description cannot be empty";

  if (status == null) errors.status = "Status can't be null";

  if (res.req.user.role !== "admin") {
    errors.main = "Only admins are allowed to post/edit a challenge";
    errors.devMsg = "User is not an admin";
  }

  if (!res.req.user.user_id) {
    errors.main = "Something went wrong. Please try again.";
    errors.devError = "No userId found in request";
  }

  if (!endDate)
    errors.endDate = "Please choose a valid end date for challenge.";

  return {
    errors,
    isValid: isEmptyObject(errors),
  };
}

module.exports = {
  createChallengeValidation,
  editChallengeValidation,
};
