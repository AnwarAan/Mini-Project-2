import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import Controller from "./controller.js";

const controller = new Controller();

const getReviews = tryCatch(async (req, res, next) => {
  const query = req.query;
  const response = await controller.getReviews(query);
  return utils.responseSuccess(res, response);
});

const getReviewByEventId = tryCatch(async (req, res, next) => {
  const params = req.params.eventId;
  const response = await controller.getReviewByEventId(params);
  return utils.responseSuccess(res, response);
});

const getReviewById = tryCatch(async (req, res, next) => {
  const params = req.params.reviewId;
  const response = await controller.getReviewById(params);
  return utils.responseSuccess(res, response);
});

const addReview = tryCatch(async (req, res, next) => {
  const payload = req.body;
  const response = await controller.addReview(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const deleteReview = tryCatch(async (req, res, next) => {
  const params = req.params.reviewId;
  const response = await controller.deleteReview(params);
  return utils.responseSuccess(res, response);
});

export default { getReviews, getReviewById, getReviewByEventId, addReview, deleteReview };
