const responseFail = (res, message, statusCode) => {
  const response = {
    status: false,
    statusCode,
    message,
  };
  return res.status(statusCode).json(response);
};

const responseSuccess = (res, data, message, statusCode) => {
  const response = {
    status: true,
    statusCode,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export default { responseFail, responseSuccess };
