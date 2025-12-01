import { Request, Response } from "express";
import { AcessService } from "../services/acessibilidades.service";

export const AcessibilidadesController = {
  async list(_req: Request, res: Response) {
    const data = await AcessService.list();
    res.json(data);
  },

  async create(req: Request, res: Response) {
    try {
      const { descricao } = req.body;
      const created = await AcessService.create(descricao);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(e.status || 400).json({ error: e.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { descricao } = req.body;
      const updated = await AcessService.update(id, descricao);
      res.json(updated);
    } catch (e: any) {
      res.status(e.status || 400).json({ error: e.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await AcessService.delete(id);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(e.status || 400).json({ error: e.message });
    }
  },
};