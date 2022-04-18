export const createOfferingInputValidation = ({
  title,
  description,
  ownerName,
  ownerEmail,
  attachement,
  privacyCheck,
}) => {
  errors = {};

  if (!title) errors.title = "Title for creating a new offering is required";

  if (!description.getCurrentContent().hasText()) errors.description = "Provide some description to understand offering";

  if (!ownerName) errors.ownerName = "Owner Name is required";

  if (!ownerEmail) errors.ownerEmail = "Owner Email is required";

  if (!attachement) errors.attachement = "Attachement is required";

  if (!privacyCheck) errors.privacyCheck = "Please selct this checkbox";

  return errors;
};
