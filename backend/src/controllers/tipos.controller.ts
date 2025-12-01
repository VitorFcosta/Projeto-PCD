import { Request, Response } from "express";
import { TiposService } from "../services/tipos.service";

export const TiposController = {
  async list(_req: Request, res: Response) {
    const data = await TiposService.list();
    res.json(data);
  },
  async listWithSubtipos(_req: Request, res: Response) {
    const data = await TiposService.listWithSubtipos();
    res.json(data);
  },
  async create(req: Request, res: Response) {
    try {
      const { nome } = req.body ?? {};
      const created = await TiposService.create(nome);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
  
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { nome } = req.body;
      const updated = await TiposService.update(id, nome);
      res.json(updated);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await TiposService.delete(id);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
};