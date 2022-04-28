export const createOfferingInputValidation = ({
  offeringTitle,
  offeringDescription,
  ownerName,
  ownerEmail,
  attachment,
  privacyCheck,
}) => {
  errors = {};

  if (!offeringTitle) errors.offeringTitle = "Title for creating a new offering is required";

  if (!offeringDescription.getCurrentContent().hasText()) errors.offeringDescription = "Provide some description to understand offering";

  if (!ownerName) errors.ownerName = "Owner Name is required";

  if (!ownerEmail) errors.ownerEmail = "Owner Email is required";

  if (!attachment) errors.attachment = "Attachement is required";

  if (!privacyCheck) errors.privacyCheck = "Please selct this checkbox";

  return errors;
};
