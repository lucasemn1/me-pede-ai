import { createConnection } from "typeorm";
import { Market } from "../models/Market";

export default class MarketReporitory {
  static async create(market: Market) {
    const connection = await createConnection();

    try {
      const { id } = await connection.manager.save(market);

      return id ? true: false;  
    }
    catch(err) {
      console.log(err);
      return false;
    }
  }
}