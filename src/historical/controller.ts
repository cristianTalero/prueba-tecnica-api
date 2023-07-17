import { Request, Response } from "express";
import { db } from "../database";
import { IHistorical } from "./contract";

/** Get dates from body request */
function getDates({ body }: Request) {
  return {
    fechaInicial: body.fechaInicial,
    fechaFinal: body.fechaFinal,
  };
}

/** Manage database error */
function manageDatabaseError(err: unknown, res: Response) {
  if (err) {
    return res.status(500).json({
      error: "Ocurrio un error inesperado, intentalo de nuevo",
    });
  }
}

export class HistoricalController implements IHistorical {
  getHistTramos(req: Request, res: Response) {
    const { fechaInicial, fechaFinal } = getDates(req);

    const consultaTramos = `
      SELECT c.Linea,
      SUM(c.Residencial + c.Comercial + c.Industrial) AS consumo,
      SUM(p.Residencial + p.Comercial + p.Industrial) AS perdidas,
      SUM(co.Residencial + co.Comercial + co.Industrial) AS costo
      FROM consumo_tramo c JOIN costos_tramo co
      ON c.Fecha = co.Fecha AND c.Linea = co.Linea
      JOIN perdidas_tramo p ON c.Fecha = p.Fecha
      AND c.Linea = p.Linea WHERE c.Fecha
      BETWEEN '${fechaInicial}' AND '${fechaFinal}'
      GROUP BY c.Linea ORDER BY c.Linea;`;

    db.query(consultaTramos, (err, data) => {
      manageDatabaseError(err, res);
      console.log(data);

      res.json(data);
    });
  }

  getHistCliente(req: Request, res: Response) {
    const { fechaInicial, fechaFinal } = getDates(req);

    const consultaCliente = `
      SELECT c.Linea, SUM(c.Residencial) AS consumo_residencial,
      SUM(c.Comercial) AS consumo_comercial,
      SUM(c.Industrial) AS consumo_industrial,
      SUM(p.Residencial) AS perdidas_residencial,
      SUM(p.Comercial) AS perdidas_comercial,
      SUM(p.Industrial) AS perdidas_industrial,
      SUM(co.Residencial) AS costo_residencial,
      SUM(co.Comercial) AS costo_comercial,
      SUM(co.Industrial) AS costo_industrial
      FROM consumo_tramo c JOIN costos_tramo co
      ON c.Fecha = co.Fecha AND c.Linea = co.Linea
      JOIN perdidas_tramo p ON c.Fecha = p.Fecha
      AND c.Linea = p.Linea WHERE c.Fecha
      BETWEEN '${fechaInicial}' AND '${fechaFinal}'
      GROUP BY c.Linea ORDER BY c.Linea`;

    db.query(consultaCliente, (err, data) => {
      manageDatabaseError(err, res);
      console.log(data);

      res.json(data);
    });
  }

  getTramosCliente(req: Request, res: Response) {
    const { fechaInicial, fechaFinal } = getDates(req);

    const consultaTramosCliente = `
      SELECT TipoConsumo, Linea, Perdidas
      FROM (
        SELECT "Residencial" AS TipoConsumo,
        pt.Linea, pt.Residencial AS Perdidas
        FROM perdidas_tramo pt WHERE pt.Fecha
        BETWEEN '${fechaInicial}' AND '${fechaFinal}'
        UNION ALL SELECT "Comercial" AS TipoConsumo,
        pt.Linea, pt.Comercial AS Perdidas
        FROM perdidas_tramo pt WHERE pt.Fecha
        BETWEEN '${fechaInicial}' AND '${fechaFinal}'
        UNION ALL SELECT "Industrial" AS TipoConsumo, pt.Linea,
        pt.Industrial AS Perdidas FROM perdidas_tramo pt WHERE
        pt.Fecha BETWEEN '${fechaInicial}' AND '${fechaFinal}'
      ) AS combined_data ORDER BY TipoConsumo, Perdidas DESC LIMIT 20`;

    db.query(consultaTramosCliente, (err, data) => {
      manageDatabaseError(err, res);
      console.log(data);

      res.json(data);
    });
  }
}
