import Events from "./repositories.js";
import AppError from "../../utils/app-error.js";
import Promo from "../../models/promo.js";
import Attendee from "../../models/attendee.js";
import Referral from "../../models/referral.js";
import User from "../../models/user.js";

export default class Controller {
  constructor() {
    this.event = new Events();
  }

  async getEvents(query) {
    const params = {
      include: [{ model: Promo }, { model: Attendee }, { model: Referral }],
      where: query,
    };
    console.log("query", query);
    const result = await this.event.findManyEvent(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);

    return result;
  }

  async getEventUserId(userId) {
    const params = { where: { userId: userId } };
    const result = await this.event.findOneEvent(params);
    // if (result === null) throw new AppError("Event not Found", 404);
    return result;
  }

  async getEventById(eventId) {
    const params = {
      include: [{ model: Promo }, { model: Attendee }, { model: Referral }, { model: User }],
      where: { id: eventId },
    };
    const result = await this.event.findOneEvent(params);
    // if (result === null) throw new AppError("Event not Found", 404);
    return result;
  }

  async addEvent(payload, file) {
    console.log(file);
    const {
      name,
      date,
      time,
      description,
      type,
      price,
      category,
      tags,
      isOnline,
      province,
      regency,
      district,
      address,
      quota,
      userId,
    } = payload;
    const data = {
      name: name,
      date: date,
      time: time,
      description: description,
      type: type,
      price: price,
      category: category,
      tags: tags,
      is_online: isOnline,
      province: province,
      regency: regency,
      district: district,
      address: address,
      quota: quota,
      image_url: file.filename,
      userId: userId,
    };
    await this.event.insertOneEvent(data);
  }

  async updateEvent(payload, eventId) {
    const { name, nickname, phoneNumber, address, gender } = payload;
    const getEvent = await this.getEventById(eventId);
    const params = { where: { id: eventId } };
    const EventData = getEvent.dataValues;

    let updateData = {};
    if (EventData.name !== name) {
      updateData.name = name;
    }
    if (EventData.nickname !== nickname) {
      updateData.nickname = nickname;
    }
    if (EventData.phone_number !== phoneNumber) {
      updateData.phone_number = phoneNumber;
    }
    if (EventData.address !== address) {
      updateData.address = address;
    }
    if (EventData.gender !== gender) {
      updateData.gender = gender;
    }

    await this.event.updateOneEvent(updateData, params);
  }

  async deleteEvent(eventId) {
    const params = { where: { id: eventId } };
    const result = await this.event.deleteOneEvent(params);
    return result;
  }

  async deleteEvent(eventId) {
    const params = { where: { id: eventId } };
    await this.event.deleteOneEvent(params);
  }
}
