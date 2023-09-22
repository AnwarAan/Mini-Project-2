import User from "../../models/user.js";

export default class Users {
  async findManyUser() {
    const result = await User.findAll();
    return result;
  }

  async findOneUser(params) {
    const result = await User.findOne(params);
    return result;
  }

  async insertOneUser(data) {
    const result = await User.create(data);
    return result;
  }

  async updateOneUser(data, params) {
    const result = await User.update(data, params);
    return result;
  }

  async deleteOneUser(params) {
    const result = await User.destroy(params);
    return result;
  }
}
