import Users from "./repositories.js";
import AppError from "../../utils/app-error.js";
import bcrypt from "../../helpers/bcrypt.js";
import jwt from "jsonwebtoken";
import Event from "../../models/event.js";
import Referral from "../../models/referral.js";

export default class Controller {
  constructor() {
    this.user = new Users();
  }

  async getUsers() {
    const result = await this.user.findManyUser();
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    return result;
  }

  async getUserById(userId) {
    const params = { include: { model: Referral }, where: { id: userId } };
    const result = await this.user.findOneUser(params);
    if (result === null) throw new AppError("User not Found", 404);
    return result;
  }

  async getEventByUserId(userId) {
    const params = { include: { model: Event, where: { userId: userId } } };
    const result = await this.user.findManyUser(params);
    if (result === null) throw new AppError("User not Found", 404);
    return result;
  }

  async getUserByEmail(email) {
    const params = { where: { email: email } };
    const result = await this.user.findOneUser(params);
    return result;
  }

  async register(payload) {
    const { firstName, lastName, email, password } = payload;
    const imageURL = `https://robohash.org/${firstName}`;
    const checkUser = await this.getUserByEmail(email);
    if (checkUser !== null) throw new AppError("Email Already Exist", 403);
    const pwd = await bcrypt.hashPwd(password);
    const data = { first_name: firstName, last_name: lastName, email: email, password: pwd, image_url: imageURL };
    await this.user.insertOneUser(data);
  }

  async login(payload) {
    const { email, password } = payload;
    const checkUser = await this.getUserByEmail(email);
    if (checkUser === null) throw new AppError("Email not Found");
    const dataUser = checkUser.dataValues;
    const checkPwd = await bcrypt.comparePwd(password, checkUser.dataValues.password);
    if (!checkPwd) throw new AppError("Password not Match", 401);
    const data = { id: dataUser.id };
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1h" });
    const userData = {
      id: checkUser.id,
      token,
    };

    return userData;
  }

  async updateUser(payload, userId) {
    const { name, nickname, phoneNumber, address, gender, imageUrl } = payload;
    const getUser = await this.getUserById(userId);
    const params = { where: { id: userId } };
    const userData = getUser.dataValues;

    let updateData = {};
    if (userData.name !== name) {
      updateData.name = name;
    }
    if (userData.nickname !== nickname) {
      updateData.nickname = nickname;
    }
    if (userData.phone_number !== phoneNumber) {
      updateData.phone_number = phoneNumber;
    }
    if (userData.address !== address) {
      updateData.address = address;
    }
    if (userData.gender !== gender) {
      updateData.gender = gender;
    }
    if (userData.image_url !== imageUrl) {
      updateData.image_url = imageUrl;
    }

    await this.user.updateOneUser(updateData, params);
  }

  async deleteUser(userId) {
    const params = { where: { id: userId } };
    const result = await this.user.deleteOneUser(params);
    return result;
  }
}
