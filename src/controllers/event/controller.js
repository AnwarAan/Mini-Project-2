import Events from "./repositories.js";
import AppError from "../../utils/app-error.js";
import Promo from "../../models/promo.js";
import Attendee from "../../models/attendee.js";
import Referral from "../../models/referral.js";
import User from "../../models/user.js";
import Review from "../../models/review.js";
import Wishlist from "../../models/wishlist.js";

export default class Controller {
  constructor() {
    this.event = new Events();
    this.wishlist = new Wishlist();
  }

  async getEvents(query) {
    // const params = {
    //   include: [{ model: Promo }, { model: Attendee }, { model: Referral }, { model: Wishlist }],
    //   where: query,
    // };
    // console.log("query", query);
    // const result = await this.event.findManyEvent(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    // [Op.or]: [{
    //     from: {
    //         [Op.between]: [startDate, endDate]
    //     }
    // }, {
    //     to: {
    //         [Op.between]: [startDate, endDate]
    //     }
    // }]
    const { type, is_online, thisWeek, today, category } = query;
    let params;

    if (is_online) {
      params = {
        include: [{ model: Promo }, { model: Attendee }, { model: Referral }, { model: Wishlist }],
        where: { is_online: is_online },
      };
    } else if (type) {
      params = {
        include: [{ model: Promo }, { model: Attendee }, { model: Referral }, { model: Wishlist }],
        where: { type: type },
      };
    } else if (today) {
      params = {
        include: [{ model: Promo }, { model: Attendee }, { model: Referral }, { model: Wishlist }],
        where: { date: today },
      };
    } else if (category) {
      params = {
        include: [{ model: Promo }, { model: Attendee }, { model: Referral }, { model: Wishlist }],
        where: { category: category },
      };
    } else {
      params = {
        include: [{ model: Promo }, { model: Attendee }, { model: Referral }, { model: Wishlist }],
      };
    }

    const result = await this.event.findManyEvent(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);

    console.log(params);
    console.log(query.type);
    return result;
  }

  async getEventUserId(userId) {
    const params = {
      include: [{ model: Review }, { model: Attendee }, { model: Wishlist }],
      where: { userId: userId },
    };
    const result = await this.event.findManyEvent(params);
    // if (result === null) throw new AppError("Event not Found", 404);
    return result;
  }

  async getEventById(eventId) {
    const params = {
      include: [{ model: Promo }, { model: Attendee }, { model: Referral }, { model: User }, { model: Wishlist }],
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
