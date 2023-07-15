import { Request, Response } from "express";

type Handler = (req: Request, res: Response) => void;

export interface IHistorical {
  getHistTramos: Handler;
  getHistCliente: Handler;
  getTramosCliente: Handler;
}
