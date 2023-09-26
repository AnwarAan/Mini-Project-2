import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import Controller from "./controller.js";

const controller = new Controller();

const getUsers = tryCatch(async (req, res, next) => {
  const response = await controller.getUsers();
  return utils.responseSuccess(res, response);
});

const getUserById = tryCatch(async (req, res, next) => {
  const params = req.params.userId;
  const response = await controller.getUserById(params);
  return utils.responseSuccess(res, response);
});

const getEventByUserId = tryCatch(async (req, res, next) => {
  const params = req.params.userId;
  const response = await controller.getEventByUserId(params);
  return utils.responseSuccess(res, response);
});

const register = tryCatch(async (req, res, next) => {
  const payload = req.body;
  const response = await controller.register(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const login = tryCatch(async (req, res, next) => {
  const payload = req.body;
  const response = await controller.login(payload);
  return utils.responseSuccess(res, response);
});

const updateUser = tryCatch(async (req, res, next) => {
  const params = req.params.userId;
  const payload = req.body;

  const response = await controller.updateUser(payload, params);
  return utils.responseSuccess(res, response);
});

const deleteUser = tryCatch(async (req, res, next) => {
  const params = req.params.userId;
  const response = await controller.deleteUser(params);
  return utils.responseSuccess(res, response);
});

export default { getUsers, getUserById, getEventByUserId, register, login, updateUser, deleteUser };
