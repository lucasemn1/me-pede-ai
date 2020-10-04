import { Request, response, Response } from 'express';
import { Market } from '../models/Market';
import MarketReporitory from '../repository/MarketRepository';

export default class MarketController {
  static async store(req: Request, res: Response) {
    const {
      cnpj,
      name,
      minDeliveryAmount,
      phone,
      password,
    }: {
      cnpj: string;
      name: string;
      minDeliveryAmount: number;
      phone: string;
      password: string;
    } = req.body;

    const market = new Market();
    market.cnpj = cnpj;
    market.name = name;
    market.minDeliveryAmount = minDeliveryAmount;
    market.phone = phone;
    market.password = password;

    const result = await MarketReporitory.create(market);

    if(result) {
      return res.status(201).json();
    }

    return res.status(500).json();
  }
}
