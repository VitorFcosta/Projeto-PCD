import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const AuthController = {
  // Registro de Candidato
  async registroCandidato(req: Request, res: Response) {
    try {
      const { nome, email, senha, escolaridade, telefone } = req.body;
      const candidato = await AuthService.registroCandidato({
        nome,
        email,
        senha,
        escolaridade,
        telefone,
      });
      res.status(201).json(candidato);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // Login de Candidato
  async loginCandidato(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const resultado = await AuthService.loginCandidato(email, senha);
      res.json(resultado);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  },

  // Registro de Empresa
  async registroEmpresa(req: Request, res: Response) {
    try {
      const { nome, email, senha, cnpj } = req.body;
      const empresa = await AuthService.registroEmpresa({
        nome,
        email,
        senha,
        cnpj,
      });
      res.status(201).json(empresa);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // Login de Empresa
  async loginEmpresa(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const resultado = await AuthService.loginEmpresa(email, senha);
      res.json(resultado);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  },
};
