import Attendee from "../../models/attendee.js";
import Event from "../../models/event.js";
import User from "../../models/user.js";

Attendee.belongsTo(Event);
Attendee.belongsTo(User);

export default class Attendees {
  async findManyAttendee(params) {
    const result = await Attendee.findAll(params);
    return result;
  }

  async findOneAttendee(params) {
    const result = await Attendee.findOne(params);
    return result;
  }

  async insertOneAttendee(data) {
    const result = await Attendee.create(data);
    return result;
  }

  async updateOneAttendee(data, params) {
    const result = await Attendee.update(data, params);
    return result;
  }

  async deleteOneAttendee(params) {
    const result = await Attendee.destroy(params);
    return result;
  }
}
