import { Request, Response } from "express";
import { VagasRepo } from "../repositories/vagas.repo";
import { VagasService } from "../services/vagas.service";

export const VagasController = {
  async listar(req: Request, res: Response) {
    const empresaId = req.params.empresaId ? Number(req.params.empresaId) : undefined;
    const data = await VagasRepo.list(empresaId);
    // Flatten para o frontend
    const formatado = data.map(v => ({
      ...v,
      subtipos: v.subtiposAceitos.map(s => s.subtipo),
      acessibilidades: v.acessibilidades.map(a => a.acessibilidade),
      subtiposAceitos: undefined
    }));
    res.json(formatado);
  },

  async detalhar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const vaga = await VagasRepo.findById(id);
    if (!vaga) return res.status(404).json({ error: "Vaga não encontrada" });
    
    res.json({
      ...vaga,
      subtipos: vaga.subtiposAceitos.map(s => s.subtipo),
      acessibilidades: vaga.acessibilidades.map(a => a.acessibilidade)
    });
  },

  async criar(req: Request, res: Response) {
    try {
      const { empresaId, titulo, descricao, escolaridade } = req.body;
      const vaga = await VagasService.criarVaga(Number(empresaId), titulo, descricao, escolaridade);
      res.status(201).json(vaga);
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const { titulo, descricao, escolaridade } = req.body;
      const vaga = await VagasService.atualizarVaga(Number(req.params.id), titulo, descricao, escolaridade);
      res.json(vaga);
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  },

  // ... vincularSubtipos, vincularAcessibilidades, getAcessibilidadesPossiveis, atualizarStatus, excluir ...
  // (Copie os métodos do código anterior, eles não mudaram de lógica, apenas usam o service)
  async vincularSubtipos(req: Request, res: Response) {
    try { await VagasService.vincularSubtipos(Number(req.params.id), req.body.subtipoIds); res.json({ ok: true }); } 
    catch (e: any) { res.status(400).json({ error: e.message }); }
  },
  async vincularAcessibilidades(req: Request, res: Response) {
    try { await VagasService.vincularAcessibilidades(Number(req.params.id), req.body.acessibilidadeIds); res.json({ ok: true }); } 
    catch (e: any) { res.status(400).json({ error: e.message }); }
  },
  async getAcessibilidadesPossiveis(req: Request, res: Response) {
    try { const data = await VagasService.listarAcessibilidadesPossiveis(Number(req.params.id)); res.json(data); } 
    catch (e: any) { res.status(500).json({ error: e.message }); }
  },
  async atualizarStatus(req: Request, res: Response) {
    try { await VagasService.alternarStatus(Number(req.params.id), req.body.isActive); res.json({ ok: true }); } 
    catch (e: any) { res.status(400).json({ error: e.message }); }
  },
  async excluir(req: Request, res: Response) {
    try { await VagasService.excluirVaga(Number(req.params.id)); res.json({ ok: true }); } 
    catch (e: any) { res.status(400).json({ error: e.message }); }
  }
};