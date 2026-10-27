import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        res.status(400).json({ error: "E-mail e senha são obrigatórios." });
        return;
      }

      const dadosAutenticacao = await authService.login(email, senha);
      
      res.status(200).json(dadosAutenticacao);
    } catch (error: any) {
      // 401 Unauthorized é o status HTTP correto para falhas de login
      res.status(401).json({ error: error.message });
    }
  }
}