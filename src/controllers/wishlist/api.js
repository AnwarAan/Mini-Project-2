import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import Controller from "./controller.js";

const controller = new Controller();

const getWishlists = tryCatch(async (req, res, next) => {
  const query = req.query;
  const response = await controller.getWishlists(query);
  return utils.responseSuccess(res, response);
});

const getWishlistByEventId = tryCatch(async (req, res, next) => {
  const params = req.params.eventId;
  const response = await controller.getWishlistByEventId(params);
  return utils.responseSuccess(res, response);
});

const getWishlistById = tryCatch(async (req, res, next) => {
  const params = req.params.WishlistId;
  const response = await controller.getWishlistById(params);
  return utils.responseSuccess(res, response);
});

const addWishlist = tryCatch(async (req, res, next) => {
  const payload = req.body;
  const response = await controller.addWishlist(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const deleteWishlist = tryCatch(async (req, res, next) => {
  const params = req.params.WishlistId;
  const response = await controller.deleteWishlist(params);
  return utils.responseSuccess(res, response);
});

export default {
  getWishlists,
  getWishlistById,
  getWishlistByEventId,
  addWishlist,
  deleteWishlist,
};
