export const createSolutionInputValidation = ({
  solutionTitle,
  solutionDescription,
}) => {
  errors = {};

  if (!solutionTitle) errors.solutionTitle = "Title for creating solution is required";

  if (!solutionDescription.getCurrentContent().hasText()) errors.solutionDescription = "Provide some description to understand solution";

  return errors;
};
