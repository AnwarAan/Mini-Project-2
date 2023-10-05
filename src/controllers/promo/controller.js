import Promos from "./repositories.js";
import AppError from "../../utils/app-error.js";
import { Op, Sequelize } from "sequelize";
import User from "../../models/user.js";
import Event from "../../models/event.js";

export default class Controller {
  constructor() {
    this.promo = new Promos();
  }

  async getPromos(query) {
    const params = { include: { model: Event } };
    const result = await this.promo.findManyPromo(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);

    return result;
  }

  async getPromoById(promoId) {
    const params = { where: { id: promoId } };
    const result = await this.promo.findOnePromo(params);
    if (result === null) throw new AppError("Promo not Found", 404);
    return result;
  }

  async addPromo(payload) {
    const { percentage, limit, eventId } = payload;
    const data = {
      percentage: percentage,
      limit: limit,
      eventId: eventId,
    };
    await this.promo.insertOnePromo(data);
  }

  async updatePromo(payload, promoId) {
    console.log("this", promoId);
    const params = { where: { id: promoId } };
    const getPromo = await this.getPromoById(promoId);
    const promoData = getPromo.dataValues;
    let updateData = {};

    // if (promoData.name !== name) throw new AppError("Invalid Promo", 403);
    updateData.limit = promoData.limit - 1;
    await this.promo.updateOnePromo(updateData, params);
    console.log("promo", updateData);
    const checkPromo = await this.getPromoById(promoId);
    if (checkPromo.limit < 1) {
      await this.deletePromo(promoId);
      return "Promo is Over";
    }
  }

  async deletePromo(promoId) {
    console.log("id", promoId);
    const params = { where: { id: promoId } };
    console.log(params);
    const result = await this.promo.deleteOnePromo(params);
    return result;
  }
}
