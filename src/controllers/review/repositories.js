import Review from "../../models/review.js";
import User from "../../models/user.js";
import Event from "../../models/event.js";
import { Model } from "sequelize";

Event.hasMany(Review);
Review.belongsTo(Event);
User.hasOne(Review);
Review.belongsTo(User);

export default class Reviews {
  async findManyReview(params) {
    const result = await Review.findAll(params);
    return result;
  }

  async findOneReview(params) {
    const result = await Review.findOne(params);
    return result;
  }

  async insertOneReview(data) {
    const result = await Review.create(data);
    return result;
  }

  async updateOneReview(data, params) {
    const result = await Review.update(data, params);
    return result;
  }

  async deleteOneReview(params) {
    const result = await Review.destroy(params);
    return result;
  }
}
