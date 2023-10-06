import Wishlists from "./repositories.js";
import AppError from "../../utils/app-error.js";
import User from "../../models/user.js";
import { Op } from "sequelize";

export default class Controller {
  constructor() {
    this.wishlist = new Wishlists();
  }

  async getWishlists(query) {
    const params = {};
    const result = await this.wishlist.findManyWishlist(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);

    return result;
  }

  async getWishlistByEventId(eventId) {
    const params = { include: [{ model: User }], where: { eventId: eventId } };

    const result = await this.wishlist.findManyWishlist(params);
    if (result === null) throw new AppError("Wishlist not Found", 404);
    return result;
  }

  async getWishlistById(params) {
    // const params = { where: { id: wishlistId } };
    const result = await this.wishlist.findOneWishlist(params);
    // if (result === null) throw new AppError("Wishlist not Found", 404);
    return result;
  }

  async addWishlist(payload) {
    const { eventId, userId } = payload;
    const params = { where: { [Op.and]: [{ userId: userId }, { eventId: eventId }] } };
    const getWishlist = await this.getWishlistById(params);
    const data = {
      eventId: eventId,
      userId: userId,
      status: true,
    };
    let updateData = {};
    if (getWishlist) {
      const status = getWishlist.dataValues.status;
      updateData.status = !status;
      await this.wishlist.updateOneWishlist(updateData, params);
    } else {
      await this.wishlist.insertOneWishlist(data);
    }
  }

  async updateWishlist(payload) {
    const { status, eventId, userId } = payload;

    console.log(payload);
    const data = {
      status: status,
      eventId: eventId,
      userId: userId,
    };
    await this.wishlist.insertOneWishlist(data);
  }

  async deleteWishlist(wishlistId) {
    const params = { where: { id: wishlistId } };
    const result = await this.wishlist.deleteOneWishlist(params);
    return result;
  }
}
