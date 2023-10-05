import tryCatch from "../../utils/try-catch.js";
import utils from "../../utils/utils.js";
import Controller from "./controller.js";

const controller = new Controller();

const getAttendees = tryCatch(async (req, res, next) => {
  const query = req.query;
  const response = await controller.getAttendees(query);
  return utils.responseSuccess(res, response);
});

const getAttendeeByEventId = tryCatch(async (req, res, next) => {
  const params = req.params.eventId;
  const response = await controller.getAttendeeByEventId(params);
  return utils.responseSuccess(res, response);
});

const getAttendeeById = tryCatch(async (req, res, next) => {
  const params = req.params.AttendeeId;
  const response = await controller.getAttendeeById(params);
  return utils.responseSuccess(res, response);
});

const addAttendee = tryCatch(async (req, res, next) => {
  const payload = req.body;
  const response = await controller.addAttendee(payload);
  return utils.responseSuccess(res, response, "Success", 201);
});

const deleteAttendee = tryCatch(async (req, res, next) => {
  const params = req.params.AttendeeId;
  const response = await controller.deleteAttendee(params);
  return utils.responseSuccess(res, response);
});

export default { getAttendees, getAttendeeById, getAttendeeByEventId, addAttendee, deleteAttendee };
