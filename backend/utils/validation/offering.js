const { roles } = require("../constants");
const { isEmptyObject } = require("../utils");

function createOfferingValidation(req, res) {
    const {
        offeringTitle,
        offeringDescription,
        attachment,
        ownerName,
        ownerEmail,
        industryName
    } = req.body;

    const errors = {};

    if (!offeringTitle) errors.offeringTitle = "Offering name cannot be empty";

    if (!offeringDescription)
        errors.offeringDescription = "Offering Description cannot be empty";

    if (res.req.user.role !== roles["super_admin"]) {
        errors.main = "Only super_admin is allowed to create an offering";
        errors.devMsg = "User is not an super_admin";
    }

    if (!res.req.user.user_id) {
        errors.main = "Something went wrong. Please try again.";
        errors.devMsg = "No userId found in request";
    }

    if (!ownerName) errors.ownerName = "Owner name cannot be empty";

    if (!ownerEmail) errors.ownerEmail = "Owner Email cannot be empty";

    if (!industryName) errors.industryName = "Industry name cannot be empty";


    return {
        errors,
        isValid: isEmptyObject(errors),
    };
}

function editOfferingValidation(req, res) {
    const {
        offeringTitle,
        offeringDescription,
        attachment,
        ownerName,
        ownerEmail,
        industryName
    } = req.body;

    const errors = {};

    if (!offeringTitle) errors.offeringTitle = "Offering name cannot be empty";

    if (!offeringDescription)
        errors.offeringDescription = "Offering Description cannot be empty";

    if (res.req.user.role !== roles["super_admin"]) {
        errors.main = "Only super_admin is allowed to create/edit an offering";
        errors.devMsg = "User is not a super admin";
    }

    if (!res.req.user.user_id) {
        errors.main = "Something went wrong. Please try again.";
        errors.devMsg = "No userId found in request";
    }

    if (!ownerName) errors.ownerName = "Owner name cannot be empty";

    if (!ownerEmail) errors.ownerEmail = "Owner Email cannot be empty";

    if (!industryName) errors.industryName = "Industry name cannot be empty";


    return {
        errors,
        isValid: isEmptyObject(errors),
    };
}


module.exports = {
    createOfferingValidation,
    editOfferingValidation
};