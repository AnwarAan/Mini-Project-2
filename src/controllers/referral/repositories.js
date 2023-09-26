import Referral from "../../models/referral.js";
import User from "../../models/user.js";
import Event from "../../models/event.js";

User.hasMany(Referral);
Referral.belongsTo(User);

export default class Referrals {
  async findManyReferral(params) {
    const result = await Referral.findAll(params);
    return result;
  }

  async findOneReferral(params) {
    const result = await Referral.findOne(params);
    return result;
  }

  async insertOneReferral(data) {
    const result = await Referral.create(data);
    return result;
  }

  async updateOneReferral(data, params) {
    const result = await Referral.update(data, params);
    return result;
  }

  async deleteOneReferral(params) {
    const result = await Referral.destroy(params);
    return result;
  }
}
