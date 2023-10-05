import User from "../../models/user.js";
import Attendee from "../../models/attendee.js";
import Referral from "../../models/referral.js";
import Review from "../../models/review.js";
import Order from "../../models/order.js";
import Event from "../../models/event.js";
import sequelize from "../../config/db.js";

User.hasMany(Event);
User.hasMany(Attendee);
User.hasOne(Review);
User.hasMany(Order);
User.hasMany(Referral);

export default class Users {
  async findManyUser(params) {
    const result = await User.findAll(params);
    return result;
  }

  async findOneUser(params) {
    const result = await User.findOne(params);
    return result;
  }

  async insertOneUser(data) {
    const result = await User.create(data);
    return result;
  }

  async updateOneUser(data, params) {
    const result = await User.update(data, params);
    return result;
  }

  async deleteOneUser(params) {
    const result = await User.destroy(params);
    return result;
  }
}
