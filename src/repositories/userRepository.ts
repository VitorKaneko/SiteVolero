import prisma from '../config/prisma';

export class UserRepository {
  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findByCpf(cpf: string) {
    return await prisma.user.findUnique({ where: { cpf } });
  }

  async create(data: any) {
    return await prisma.user.create({ data });
  }
}