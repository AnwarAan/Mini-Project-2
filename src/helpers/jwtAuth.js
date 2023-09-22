import Users from "../controllers/user/repositories.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/app-error.js";
import utils from "../utils/utils.js";
import tryCatch from "../utils/try-catch.js";

const user = new Users();
const jwtAuth = tryCatch(async (req, res, next) => {
  const header = req.headers;
  if (header.authorization.includes("Bearer")) {
    const token = header.authorization.split(" ")[1];
    if (token) {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      if (!decode) throw new AppError("Invalid Token", 403);

      const userData = await user.findOneUser({ where: { id: decode.id } });
      if (userData) {
        return next();
      }
    }
    throw new AppError("Invalid Token", 403);
  }
  throw new AppError("Invalid Token", 403);
});

export default jwtAuth;
