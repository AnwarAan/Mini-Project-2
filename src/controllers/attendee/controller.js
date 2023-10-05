import Attendees from "./repositories.js";
import AppError from "../../utils/app-error.js";
import User from "../../models/user.js";
import Event from "../../models/event.js";

export default class Controller {
  constructor() {
    this.attendee = new Attendees();
  }

  async getAttendees(query) {
    const params = {};
    const result = await this.attendee.findManyAttendee(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);

    return result;
  }

  async getAttendeeByEventId(eventId) {
    const params = { include: [{ model: User }], where: { eventId: eventId } };

    const result = await this.attendee.findManyAttendee(params);
    if (result === null) throw new AppError("Attendee not Found", 404);
    return result;
  }

  async getAttendeeById(attendeeId) {
    const params = { where: { id: attendeeId } };
    const result = await this.attendee.findOneAttendee(params);
    if (result === null) throw new AppError("Attendee not Found", 404);
    return result;
  }

  async addAttendee(payload) {
    const { name, email, userId, eventId } = payload;
    const data = {
      name: name,
      email: email,
      userId: userId,
      eventId: eventId,
    };
    await this.attendee.insertOneAttendee(data);
  }

  async deleteAttendee(attendeeId) {
    const params = { where: { id: attendeeId } };
    const result = await this.attendee.deleteOneAttendee(params);
    return result;
  }
}
