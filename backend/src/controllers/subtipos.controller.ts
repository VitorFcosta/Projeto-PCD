import { Request, Response } from "express";
import { SubtiposService } from "../services/subtipos.service";

export const SubtiposController = {
  async list(_req: Request, res: Response) {
      const data = await SubtiposService.list();
      res.json(data);
    },
  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await SubtiposService.findDeep(id);
    res.json(data);
  },
  async create(req: Request, res: Response) {
    const { nome, tipoId } = req.body ?? {};
    const created = await SubtiposService.create(nome, Number(tipoId));
    res.status(201).json(created);
  },
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { nome, tipoId } = req.body;
      const updated = await SubtiposService.update(id, nome, Number(tipoId));
      res.json(updated);
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  },

  async delete(req: Request, res: Response) {
    try {
      await SubtiposService.delete(Number(req.params.id));
      res.json({ ok: true });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  },
};
