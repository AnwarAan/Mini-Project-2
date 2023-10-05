import sequelize from "../../config/db.js";
import Event from "../../models/event.js";
import User from "../../models/user.js";
import Attendee from "../../models/attendee.js";
import Review from "../../models/review.js";
import Referral from "../../models/referral.js";
import Promo from "../../models/promo.js";
import Order from "../../models/order.js";

Event.hasMany(Attendee);
Event.belongsTo(User);
Event.hasMany(Review);
Event.hasMany(Referral);
Event.hasOne(Promo);
Event.hasMany(Order);

export default class Events {
  async findManyEvent(params) {
    const result = await Event.findAll(params);
    return result;
  }

  async findOneEvent(params) {
    const result = await Event.findOne(params);
    return result;
  }

  async insertOneEvent(data) {
    const result = await Event.create(data);
    return result;
  }

  async updateOneEvent(data, params) {
    const result = await Event.update(data, params);
    return result;
  }

  async deleteOneEvent(params) {
    const result = await Event.destroy(params);
    return result;
  }
}
