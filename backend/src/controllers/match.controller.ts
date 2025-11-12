// src/controllers/match.controller.ts
import { Request, Response } from "express";
import { encontrarVagasCompativeis, encontrarCandidatosCompativeis } from "../services/match.service";

export const MatchController = {
  async listarVagasCompativeis(req: Request, res: Response) {
    try {
      const candidatoId = Number(req.params.candidatoId);
      if (isNaN(candidatoId)) {
        return res.status(400).json({ error: "ID de candidato inválido" });
      }

      const vagas = await encontrarVagasCompativeis(candidatoId);
      res.json(vagas);
    } catch (err: any) {
      console.error("Erro ao buscar vagas compatíveis:", err);
      res.status(500).json({ error: err.message ?? "Erro interno no servidor" });
    }
  },

  async listarCandidatosCompativeis(req: Request, res: Response) {
    try {
      const vagaId = Number(req.params.vagaId);
      if (isNaN(vagaId)) {
        return res.status(400).json({ error: "ID de vaga inválido" });
      }

      const candidatos = await encontrarCandidatosCompativeis(vagaId);
      res.json(candidatos);
    } catch (err: any) {
      console.error("Erro ao buscar candidatos compatíveis:", err);
      res.status(500).json({ error: err.message ?? "Erro interno no servidor" });
    }
  },
};