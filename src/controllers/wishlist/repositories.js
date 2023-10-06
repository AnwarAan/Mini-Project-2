import Wishlist from "../../models/wishlist.js";
import Event from "../../models/event.js";
import User from "../../models/user.js";

Wishlist.belongsTo(User);
Wishlist.belongsTo(Event);

export default class Wishlists {
  async findManyWishlist(params) {
    const result = await Wishlist.findAll(params);
    return result;
  }

  async findOneWishlist(params) {
    const result = await Wishlist.findOne(params);
    return result;
  }

  async insertOneWishlist(data) {
    const result = await Wishlist.create(data);
    return result;
  }

  async updateOneWishlist(data, params) {
    const result = await Wishlist.update(data, params);
    return result;
  }

  async deleteOneWishlist(params) {
    const result = await Wishlist.destroy({ truncate: true });
    return result;
  }
}
