import Promo from "../../models/promo.js";
import Event from "../../models/event.js";
import sequelize from "../../config/db.js";

Promo.belongsTo(Event);

export default class Promos {
  async findManyPromo(params) {
    const result = await Promo.findAll(params);
    return result;
  }

  async findOnePromo(params) {
    const result = await Promo.findOne(params);
    return result;
  }

  async insertOnePromo(data) {
    const result = await Promo.create(data);
    return result;
  }

  async updateOnePromo(data, params) {
    const result = await Promo.update(data, params);
    return result;
  }

  async deleteOnePromo(params) {
    const result = await Promo.destroy(params);
    return result;
  }
}
