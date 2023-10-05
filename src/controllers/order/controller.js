import Orders from "./repositories.js";
import AppError from "../../utils/app-error.js";
import Event from "../../models/event.js";

export default class Controller {
  constructor() {
    this.order = new Orders();
  }

  async getOrders(query) {
    const params = {};
    const result = await this.order.findManyOrder(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);

    return result;
  }

  async getOrderById(userId) {
    console.log(userId);
    const params = { include: [{ model: Event }], where: { userId: userId } };
    const result = await this.order.findManyOrder(params);
    if (result === null) throw new AppError("Order not Found", 404);
    return result;
  }

  async addOrder(payload) {
    const { eventId, userId } = payload;
    const data = {
      eventId: eventId,
      userId: userId,
    };
    console.log(data);
    await this.order.insertOneOrder(data);
  }

  async deleteOrder(orderId) {
    const params = { where: { id: orderId } };
    const result = await this.order.deleteOneOrder(params);
    return result;
  }
}
