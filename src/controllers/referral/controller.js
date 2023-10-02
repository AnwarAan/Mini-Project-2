import Referral from "./repositories.js";
import AppError from "../../utils/app-error.js";
import User from "../../models/user.js";
import Event from "../../models/event.js";
import generatorCode from "../../helpers/generator-code.js";
import { v4 as uuidv4 } from "uuid";

export default class Controller {
  constructor() {
    this.referral = new Referral();
  }

  async getRefferals(query) {
    const params = {};
    const result = await this.referral.findManyReferral(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);

    return result;
  }

  async getReferralById(referralId) {
    const params = { where: { id: referralId } };
    const result = await this.referral.findOneReferral(params);
    if (result === null) throw new AppError("Referral not Found", 404);
    return result;
  }

  async getReferralByCode(code) {
    const params = { where: { code: code } };
    const result = await this.referral.findOneReferral(params);
    // if (result === null) throw new AppError("Referral not Found", 404);
    return result;
  }

  async addReferral(payload) {
    const { userId, eventId } = payload;
    const data = {
      code: uuidv4(),
      time: Date.now() + 24 * 60 * 60 * 1000,
      userId: userId,
      eventId: eventId,
    };
    await this.referral.insertOneReferral(data);
  }

  async redeemReferral(payload, referralId) {
    const { code } = payload;
    const getReferral = await this.getReferralById(referralId);
    const dataReferral = getReferral.dataValues;

    if (dataReferral.code !== code) throw new AppError("Invalid Referral Code");
    if (dataReferral.code === code) await this.deleteReferral(referralId);
  }

  async deleteReferral(referralId) {
    const params = { where: { id: referralId } };
    const result = await this.referral.deleteOneReferral(params);
    return result;
  }

  async deleteReferralByCode(code) {
    const params = { where: { code: code } };
    const result = await this.referral.deleteOneReferral(params);
    return result;
  }
}
