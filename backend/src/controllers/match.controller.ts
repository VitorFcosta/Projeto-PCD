import { Request, Response } from "express";
import { encontrarVagasCompativeis, encontrarCandidatosCompativeis, realizarCandidatura } from "../services/match.service";

export const MatchController = {
  async listarVagasCompativeis(req: Request, res: Response) {
    try {
      const id = Number(req.params.candidatoId);
      const vagas = await encontrarVagasCompativeis(id);
      res.json(vagas);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
  },

  async listarCandidatosCompativeis(req: Request, res: Response) {
    try {
      const id = Number(req.params.vagaId);
      const candidatos = await encontrarCandidatosCompativeis(id);
      res.json(candidatos);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
  },

  async aplicarParaVaga(req: Request, res: Response) {
    try {
      const { candidatoId, vagaId } = req.body;
      await realizarCandidatura(Number(candidatoId), Number(vagaId));
      res.status(201).json({ ok: true });
    } catch (err: any) {
      if (err.code === 'P2002') return res.status(400).json({ error: "Já candidatado" });
      res.status(500).json({ error: "Erro ao aplicar" });
    }
  }
};