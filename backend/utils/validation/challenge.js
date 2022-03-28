const { isEmptyObject } = require("../utils");


function createChallengeValidation(req) {
    const { challengeName, challengeDescription, userId, endDate, tags, challengeImage, supportingMedia, reward } = req.body;

    const errors = {};

    if (!challengeName) errors.challengeName = "Challenge name cannot be empty";

    if (!challengeDescription) errors.challengeDescription = "Description cannot be empty";

    if(!userId) {
        errors.main = "Something went wrong. Please try again.";
        errors.devError = "No userId found in request";
    }

    if(!endDate) errors.endDate = "Please choose a valid end date for challenge.";

    if(!tags) errors.tags = "You must enter atleast 1 tag";

    if (!req.file || !req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) errors.challengeImage = "Please choose a valid cover image for challenge";


    return {
        errors,
        isValid: isEmptyObject(errors),
    };
}

function editChallengeValidation(req) {
    const { challengeTitle, challengeDescription, userId, endDate, status, supportingMedia, reward } = req.body;

    const errors = {};

    if (!challengeTitle) errors.challengeTitle = "Challenge title cannot be empty";

    if (!challengeDescription) errors.challengeDescription = "Description cannot be empty";

    if(status == null) errors.status = "Status can't be null";

    if (!userId) {
        errors.main = "Something went wrong. Please try again.";
        errors.devError = "No userId found in request";
    }

    if (!endDate) errors.endDate = "Please choose a valid end date for challenge.";

    return {
        errors,
        isValid: isEmptyObject(errors),
    };
}


module.exports = {
    createChallengeValidation,
    editChallengeValidation
};