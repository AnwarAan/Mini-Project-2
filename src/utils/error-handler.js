import AppError from "./app-error.js";
import utils from "./utils.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) return utils.responseFail(res, err.message, err.statusCode);

  return utils.responseFail(res, "Internal Server Error", 500);
};

export default errorHandler;
