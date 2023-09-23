import Event from "../../models/event.js";

export default class Events {
  async findManyEvent() {
    const result = await Event.findAll();
    return result;
  }

  async findOneEvent(params) {
    const result = await Event.findOne(params);
    return result;
  }

  async insertOneEvent(data) {
    const result = await Event.create(data);
    return result;
  }

  async updateOneEvent(data, params) {
    const result = await Event.update(data, params);
    return result;
  }

  async deleteOneEvent(params) {
    const result = await Event.destroy(params);
    return result;
  }
}
