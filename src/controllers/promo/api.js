import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import Controller from "./controller.js";

const controller = new Controller();

const getPromos = tryCatch(async (req, res, next) => {
  const query = req.query;
  const response = await controller.getPromos(query);
  return utils.responseSuccess(res, response);
});

const getPromoByEventId = tryCatch(async (req, res, next) => {
  const params = req.params.eventId;
  const response = await controller.getPromoByEventId(params);
  return utils.responseSuccess(res, response);
});

const getPromoById = tryCatch(async (req, res, next) => {
  const params = req.params.promoId;
  const response = await controller.getPromoById(params);
  return utils.responseSuccess(res, response);
});

const addPromo = tryCatch(async (req, res, next) => {
  const payload = req.body;
  const response = await controller.addPromo(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const updatePromo = tryCatch(async (req, res, next) => {
  const params = req.params.promoId;
  const payload = req.body;

  const response = await controller.updatePromo(payload, params);
  return utils.responseSuccess(res, response);
});

const deletePromo = tryCatch(async (req, res, next) => {
  const params = req.params.promoId;
  const response = await controller.deletePromo(params);
  return utils.responseSuccess(res, response);
});

export default { getPromos, getPromoById, getPromoByEventId, addPromo, updatePromo, deletePromo };
