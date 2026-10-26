import { UserRepository } from '../repositories/userRepository';
import bcrypt from 'bcryptjs';

const userRepository = new UserRepository();

export class UserService {
  async createUser(data: any) {
    // 1. Verifica se o email ou CPF já existem
    const emailExists = await userRepository.findByEmail(data.email);
    if (emailExists) throw new Error('Email já registado.');

    const cpfExists = await userRepository.findByCpf(data.cpf);
    if (cpfExists) throw new Error('CPF já registado.');

    // 2. Encripta a password
    const hashedPassword = await bcrypt.hash(data.senha, 10);

    // 3. Substitui a password e salva
    const userToSave = { ...data, senha: hashedPassword };
    const newUser = await userRepository.create(userToSave);

    // Removemos a password do retorno por segurança
    const { senha, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}