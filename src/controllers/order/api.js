import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import Controller from "./controller.js";

const controller = new Controller();

const getOrders = tryCatch(async (req, res, next) => {
  const query = req.query;
  const response = await controller.getOrders(query);
  return utils.responseSuccess(res, response);
});

const getOrderById = tryCatch(async (req, res, next) => {
  const params = req.params.userId;
  const response = await controller.getOrderById(params);
  return utils.responseSuccess(res, response);
});

const addOrder = tryCatch(async (req, res, next) => {
  const payload = req.body;
  const response = await controller.addOrder(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const deleteOrder = tryCatch(async (req, res, next) => {
  const params = req.params.orderId;
  const response = await controller.deleteOrder(params);
  return utils.responseSuccess(res, response);
});

export default { getOrders, getOrderById, addOrder, deleteOrder };
