import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import Controller from "./controller.js";

const controller = new Controller();

const getEvents = tryCatch(async (req, res, next) => {
  const query = req.query;
  const response = await controller.getEvents(query);
  return utils.responseSuccess(res, response);
});

const getEventUserId = tryCatch(async (req, res, next) => {
  const params = req.params.userId;
  const response = await controller.getEventUserId(params);
  return utils.responseSuccess(res, response);
});

const getEventById = tryCatch(async (req, res, next) => {
  const params = req.params.eventId;
  const response = await controller.getEventById(params);
  return utils.responseSuccess(res, response);
});

const addEvent = tryCatch(async (req, res, next) => {
  const payload = req.body;
  const file = req.file;

  const response = await controller.addEvent(payload, file);
  return utils.responseSuccess(res, response, "Success", 201);
});

const updateEvent = tryCatch(async (req, res, next) => {
  const params = req.params.EventId;
  const payload = req.body;

  const response = await controller.updateEvent(payload, params);
  return utils.responseSuccess(res, response);
});

const deleteEvent = tryCatch(async (req, res, next) => {
  const params = req.params.EventId;
  const response = await controller.deleteEvent(params);
  return utils.responseSuccess(res, response);
});

export default { getEvents, getEventById, getEventUserId, addEvent, updateEvent, deleteEvent };
