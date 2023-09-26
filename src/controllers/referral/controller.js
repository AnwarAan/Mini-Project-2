import Referral from "./repositories.js";
import AppError from "../../utils/app-error.js";
import { Op, Sequelize } from "sequelize";
import User from "../../models/user.js";
import Event from "../../models/event.js";

export default class Controller {
  constructor() {
    this.referral = new Referral();
  }

  async getRefferals(eventId) {
    const params = {};
    const result = await this.referral.findManyReferral(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);

    return result;
  }

  async getReferralByUserId(eventId) {
    const params = { include: [{ model: User }], where: { eventId: eventId } };

    const result = await this.referral.findManyReferral(params);
    if (result === null) throw new AppError("Referral not Found", 404);
    return result;
  }

  async getReferralById(ReferralId) {
    const params = { where: { id: ReferralId } };
    const result = await this.referral.findOneReferral(params);
    if (result === null) throw new AppError("Referral not Found", 404);
    return result;
  }

  async addReferral(payload) {
    const { code, owner, userId } = payload;
    const data = {
      code: code,
      owner: owner,
      userId: userId,
    };
    await this.referral.insertOneReferral(data);
  }

  async deleteReferral(ReferralId) {
    const params = { where: { id: ReferralId } };
    const result = await this.referral.deleteOneReferral(params);
    return result;
  }
}
