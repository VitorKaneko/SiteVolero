import 'dotenv/config';
import {PrismaPg} from '@prisma/adapter-pg';
import { Pool } from 'pg';
import {PrismaClient} from '../generated/prisma/client';


const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL não está configurada no ficheiro .env");
}

const pool = new Pool({ 
  connectionString,
  ssl: {
    rejectUnauthorized: false // Permite conexões com certificados de nuvem como Neon/Supabase
  }
});

const adapter = new PrismaPg( pool );

//const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({adapter});

export default prisma;