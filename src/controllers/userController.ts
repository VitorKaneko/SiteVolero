import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    try {
      // Recebe os dados do corpo da requisição (Frontend)
      const userData = req.body;
      
      // Chama o serviço
      const newUser = await userService.createUser({
        ...userData,
        dataNasc: new Date(userData.dataNasc) // Converte a data para o formato correto
      });

      // Retorna sucesso (Status 201: Created)
      res.status(201).json(newUser);
    } catch (error: any) {
      // Retorna erro (Status 400: Bad Request)
      res.status(400).json({ error: error.message });
    }
  }
}