import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import Controller from "./controller.js";

const controller = new Controller();

const getReferrals = tryCatch(async (req, res, next) => {
  const query = req.query;
  const response = await controller.getRefferals(query);
  return utils.responseSuccess(res, response);
});

const getReferralByUserId = tryCatch(async (req, res, next) => {
  const params = req.params.eventId;
  const response = await controller.getReferralByUserId(params);
  return utils.responseSuccess(res, response);
});

const getReferralById = tryCatch(async (req, res, next) => {
  const params = req.params.referralId;
  const response = await controller.getReferralById(params);
  return utils.responseSuccess(res, response);
});

const addReferral = tryCatch(async (req, res, next) => {
  const payload = req.body;
  const response = await controller.addReferral(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const redeemReferral = tryCatch(async (req, res, next) => {
  const params = req.params.referralId;
  const payload = req.body;
  const response = await controller.redeemReferral(payload, params);
  return utils.responseSuccess(res, response, "Success Redeem Code");
});

const deleteReferral = tryCatch(async (req, res, next) => {
  const params = req.params.referralId;
  const response = await controller.deleteReferral(params);
  return utils.responseSuccess(res, response);
});

export default { getReferrals, getReferralById, getReferralByUserId, addReferral, redeemReferral, deleteReferral };
