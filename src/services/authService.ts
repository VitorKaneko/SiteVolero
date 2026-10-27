import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository';

export class AuthService {
  private userRepository = new UserRepository();

  async login(email: string, senhaPlana: string) {
    // 1. Procurar o utilizador pelo e-mail
    const user = await this.userRepository.findByEmail(email);
    
    // Devolvemos a mesma mensagem genérica para não revelar se o e-mail existe na base de dados
    if (!user) {
      throw new Error("Credenciais inválidas.");
    }

    // 2. Comparar a password enviada com o hash guardado no banco
    const senhaValida = await bcrypt.compare(senhaPlana, user.senha);
    if (!senhaValida) {
      throw new Error("Credenciais inválidas.");
    }

    // 3. Gerar o JWT
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não está configurado.");
    }

    const token = jwt.sign(
      { id: user.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' } // Token expira em 1 dia
    );

    // 4. Remover a password dos dados retornados por segurança
    const { senha, ...userSemSenha } = user;

    return {
      token,
      user: userSemSenha
    };
  }
}