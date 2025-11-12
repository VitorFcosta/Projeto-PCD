import { Request, Response } from "express";
import { CandidatosService } from "../services/candidatos.service";

export const CandidatosController = {
  async listar(req: Request, res: Response) {
    const data = await CandidatosService.listar();
    res.json(data);
  },

  async buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await CandidatosService.buscarPorId(id);
    res.json(data);
  },

  async criar(req: Request, res: Response) {
    const data = await CandidatosService.criar(req.body);
    res.status(201).json(data);
  },
  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const candidato = await CandidatosService.atualizar(id, data);
      res.status(200).json(candidato);
    } catch (e: any) {
      res.status(400).json({ error: e.message ?? "Erro ao atualizar candidato" });
    }
  },
};