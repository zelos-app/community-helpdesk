function isValidationError(error) {
  return error?.status === 422;
}

function errorToValidationMessages(error) {
  const fieldsErrorsArr = error?.data?.errors;

  if (!Array.isArray(fieldsErrorsArr)) {
    return {};
  }

  const fieldsErrorsObj = {};
  fieldsErrorsArr.forEach((item) => {
    fieldsErrorsObj[item.param] = item.msg;
  });

  return fieldsErrorsObj;
}

function extractMessage(error) {
  return error?.statusText || "Unexpected error";
}

export const ErrorsHandlingHelper = {
  isValidationError,
  errorToValidationMessages,
  extractMessage,
};
