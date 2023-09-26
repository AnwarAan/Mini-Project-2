import Promos from "./repositories.js";
import AppError from "../../utils/app-error.js";
import { Op, Sequelize } from "sequelize";
import User from "../../models/user.js";
import Event from "../../models/event.js";

export default class Controller {
  constructor() {
    this.promo = new Promos();
  }

  async getPromos(eventId) {
    const params = {};
    const result = await this.promo.findManyPromo(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);

    return result;
  }

  async getPromoByEventId(eventId) {
    const params = { include: [{ model: User }], where: { eventId: eventId } };

    const result = await this.promo.findManyPromo(params);
    if (result === null) throw new AppError("Promo not Found", 404);
    return result;
  }

  async getPromoById(promoId) {
    const params = { where: { id: promoId } };
    const result = await this.promo.findOnePromo(params);
    if (result === null) throw new AppError("Promo not Found", 404);
    return result;
  }

  async addPromo(payload) {
    const { name, percentage, limit, eventId } = payload;
    const data = {
      name: name,
      percentage: percentage,
      limit: limit,
      eventId: eventId,
    };
    await this.promo.insertOnePromo(data);
  }

  async deletePromo(promoId) {
    const params = { where: { id: promoId } };
    const result = await this.promo.deleteOnePromo(params);
    return result;
  }
}
