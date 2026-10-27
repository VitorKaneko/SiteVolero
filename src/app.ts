import express, {Request, Response} from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

// Middlewares globais
app.use(cors()); // Permite que o frontend acesse a API
app.use(express.json()); // Permite que a API entenda requisições com corpo em JSON

// Rota de teste básica
app.get('/ping', (req, res) => {
  res.json({ message: 'Backend está funcionando!' });
});

// Rota de user
app.use('/api', userRoutes);
app.use('/api', authRoutes);

export default app;