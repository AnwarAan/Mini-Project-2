import Events from "./repositories.js";
import AppError from "../../utils/app-error.js";
import Promo from "../../models/promo.js";

export default class Controller {
  constructor() {
    this.Event = new Events();
  }

  async getEvents(query) {
    const result = await this.Event.findManyEvent();
    // if (result.length === 0) throw new AppError("Data Empty", 404);

    return result;
  }

  async getEventUserId(userId) {
    const params = { where: { userId: userId } };
    const result = await this.Event.findOneEvent(params);
    if (result === null) throw new AppError("Event not Found", 404);
    return result;
  }

  async getEventById(eventId) {
    const params = { include: { model: Promo }, where: { id: eventId } };
    const result = await this.Event.findOneEvent(params);
    if (result === null) throw new AppError("Event not Found", 404);
    return result;
  }

  async addEvent(payload) {
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
      userId: userId,
    };
    await this.Event.insertOneEvent(data);
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

    await this.Event.updateOneEvent(updateData, params);
  }

  async deleteEvent(eventId) {
    const params = { where: { id: eventId } };
    const result = await this.Event.deleteOneEvent(params);
    return result;
  }
}
