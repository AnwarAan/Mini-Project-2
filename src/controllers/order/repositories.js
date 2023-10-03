import Order from "../../models/order.js";
import Event from "../../models/event.js";
import User from "../../models/user.js";
import sequelize from "../../config/db.js";

Order.belongsTo(Event);
Order.belongsTo(User);

export default class Orders {
  async findManyOrder(params) {
    const result = await Promo.findAll(params);
    return result;
  }

  async findOneOrder(params) {
    const result = await Promo.findOne(params);
    return result;
  }

  async insertOneOrder(data) {
    const result = await Promo.create(data);
    return result;
  }

  async updateOneOrder(data, params) {
    const result = await Promo.update(data, params);
    return result;
  }

  async deleteOneOrder(params) {
    const result = await Promo.destroy(params);
    return result;
  }
}
