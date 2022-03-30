export const inputValidation = ({
  title,
  description,
  tags,
  endDate,
  privacyCheck,
}) => {
  errors = {};

  if (!title) errors.title = "Title for creating a new challenge is required";

  if (!description.getCurrentContent().hasText()) errors.description = "Provide some description to understand challenge";

  if (!tags.length) errors.tags = "Provide some tags to search challenge easily";

  if (!endDate) errors.endDate = "Provide an end date for challenge";
  else if (new Date(endDate) < new Date()) errors.endDate = "Choose a valid end date";

  if (!privacyCheck) errors.privacyCheck = "Please selct this checkbox";

  return errors;
};
