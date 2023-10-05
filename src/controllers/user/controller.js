import AppError from "../../utils/app-error.js"
import bcrypt from "../../helpers/bcrypt.js"
import jwt from "jsonwebtoken"
import mailer from "../../helpers/mailer.js"

import Event from "../../models/event.js"
import Referral from "../../models/referral.js"
import Promo from "../../models/promo.js"
import Attendee from "../../models/attendee.js"
import Users from "./repositories.js"

import ReferralController from "../referral/controller.js"
import EventController from "../event/controller.js"
import AttendeeController from "../attendee/controller.js"
import PromoController from "../promo/controller.js"

export default class Controller {
  constructor() {
    this.user = new Users()
    this.referral = new ReferralController()
    this.event = new EventController()
    this.attendee = new AttendeeController()
    this.promo = new PromoController()
  }

  async getUsers() {
    const params = {
      include: [
        { model: Referral, include: [Event] },
        { model: Event },
        { model: Attendee },
      ],
    }
    const result = await this.user.findManyUser(params)
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    return result
  }

  async getUserById(userId) {
    const params = {
      include: [
        { model: Referral, include: [Event] },
        { model: Event, include: [{ model: Promo }] },
        { model: Attendee },
      ],
      where: { id: userId },
    }
    const result = await this.user.findOneUser(params)
    // if (result === null) throw new AppError("User not Found", 404);
    return result
  }

  async getUserByEmail(email) {
    const params = { where: { email: email } }
    const result = await this.user.findOneUser(params)
    return result
  }

  async register(payload) {
    const { firstName, lastName, email, password } = payload
    const pwd = await bcrypt.hashPwd(password)
    const imageURL = `https://robohash.org/${firstName}`
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: pwd,
      image_url: imageURL,
    }
    const checkUser = await this.getUserByEmail(email)
    if (checkUser !== null) throw new AppError("Email Already Exist", 403)
    const user = await this.user.insertOneUser(data)
    // const token = jwt.sign({ id: user.dataValues.id }, process.env.SECRET_KEY, { expiresIn: "1h" });
    // const link = `${process.env.CLIENT_LINK}verify-email?token=${token}&userId=${user.dataValues.id}`;
    // mailer.verifyEmail(link, email);
  }

  async login(payload) {
    const { email, password } = payload
    const checkUser = await this.getUserByEmail(email)
    if (checkUser === null) throw new AppError("Email not Found", 404)
    const dataUser = checkUser.dataValues
    const checkPwd = await bcrypt.comparePwd(
      password,
      checkUser.dataValues.password
    )
    if (!checkPwd) throw new AppError("Password not Match", 401)
    const data = { id: dataUser.id }
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1h" })
    const userData = {
      id: checkUser.id,
      token,
    }

    return userData
  }

  async updateUser(payload, userId) {
    const {
      name,
      newPassword,
      confirmPassword,
      nickname,
      phoneNumber,
      address,
      gender,
      imageUrl,
      balance,
      isActive,
    } = payload
    const getUser = await this.getUserById(userId)
    const params = { where: { id: userId } }
    const userData = getUser.dataValues

    let updateData = {}
    if (userData.name !== name) {
      updateData.name = name
    }
    if (userData.nickname !== nickname) {
      updateData.nickname = nickname
    }
    if (userData.phone_number !== phoneNumber) {
      updateData.phone_number = phoneNumber
    }
    if (userData.address !== address) {
      updateData.address = address
    }
    if (userData.gender !== gender) {
      updateData.gender = gender
    }
    if (userData.image_url !== imageUrl) {
      updateData.image_url = imageUrl
    }
    if (userData.balance !== balance) {
      updateData.balance = balance
    }
    if (userData.is_active !== isActive) {
      updateData.is_active = isActive
    }

    if (newPassword !== confirmPassword)
      throw new AppError("Password not Match", 403)
    if (newPassword || confirmPassword) {
      if (newPassword === confirmPassword) {
        const password = await bcrypt.hashPwd(newPassword)
        if (userData.password !== password) {
          updateData.password = password
        }
      }
    }

    await this.user.updateOneUser(updateData, params)
  }

  async transactionUser(payload) {
    const { name, email, code, userId, eventId } = payload
    const params = { where: { id: userId } }
    const getUser = await this.getUserById(userId)
    const getEvet = await this.event.getEventById(eventId)
    const getReferral = await this.referral.getReferralByCode(code)
    const userData = getUser.dataValues
    const eventData = getEvet.dataValues
    const price = eventData.price
    const balance = userData.balance
    const transaction = balance - price
    const getUserEvent = await this.getUserById(eventData.user.id)
    const balance2 = getUserEvent.dataValues.balance

    let discount
    if (eventData.promo !== null) {
      discount = price - price * (eventData.promo.dataValues.percentage / 100)
    }

    const priceDiscon = balance - discount
    const totalPrice = discount ? priceDiscon : transaction
    const receiveTransaction = discount ? balance2 + discount : balance2 + price

    let point
    if (getReferral) {
      const getUser = await this.getUserById(getReferral.dataValues.userId)
      point = getUser.dataValues.point + 50
    }

    let updateDataBalance = {}
    let updateDataBalance2 = {}
    let updateDataPoint = {}
    updateDataBalance.balance = totalPrice
    updateDataBalance2.balance = receiveTransaction
    updateDataPoint.point = point
    if (updateDataBalance.balance < 0 && !getReferral)
      throw new AppError("Balance not Enough", 403)
    getReferral
      ? (await this.user.updateOneUser(updateDataPoint, {
          where: { id: getReferral.dataValues.userId },
        })) && (await this.referral.deleteReferral(getReferral.dataValues.id))
      : (await this.user.updateOneUser(updateDataBalance, params)) &&
        (await this.user.updateOneUser(updateDataBalance2, {
          where: { id: eventData.user.id },
        }))

    if (eventData.promo !== null && !getReferral)
      await this.promo.updatePromo(null, eventData.promo.dataValues.id)
    await this.referral.addReferral({ userId, eventId })
    await this.attendee.addAttendee({ name, email, userId, eventId })
  }

  async resetPassword(payload) {
    const { email } = payload
    const getUser = await this.getUserByEmail(email)
    if (getUser === null) throw new AppError("Email not Found", 404)
    // const token = jwt.sign({ id: getUser.dataValues.id }, process.env.SECRET_KEY, { expiresIn: "1h" });
    // const link = `${process.env.CLIENT_LINK}reset-password?token=${token}&userId=${getUser.dataValues.id}`;
    // mailer.resetPassword(link, email);
  }

  async deleteUser(userId) {
    const params = { where: { id: userId } }
    const result = await this.user.deleteOneUser(params)
    return result
  }
}
