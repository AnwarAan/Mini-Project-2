import Reviews from "./repositories.js";
import AppError from "../../utils/app-error.js";
import User from "../../models/user.js";

export default class Controller {
  constructor() {
    this.review = new Reviews();
  }

  async getReviews(query) {
    const params = {};
    const result = await this.review.findManyReview(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);

    return result;
  }

  async getReviewByEventId(eventId) {
    const params = { include: [{ model: User }], where: { eventId: eventId } };

    const result = await this.review.findManyReview(params);
    if (result === null) throw new AppError("Review not Found", 404);
    return result;
  }

  async getReviewById(reviewId) {
    const params = { where: { id: reviewId } };
    const result = await this.review.findOneReview(params);
    if (result === null) throw new AppError("Review not Found", 404);
    return result;
  }

  async addReview(payload) {
    const { rating, review, eventId, userId } = payload;
    const data = {
      rating: rating,
      review: review,
      eventId: eventId,
      userId: userId,
    };
    await this.review.insertOneReview(data);
  }

  async deleteReview(reviewId) {
    const params = { where: { id: reviewId } };
    const result = await this.review.deleteOneReview(params);
    return result;
  }
}
