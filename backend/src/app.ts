import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Включаем CORS для всех запросов
app.use(cors());

// Middlewares для парсинга JSON и URL-encoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подключаем маршруты
app.use('/api/contacts', contactRoutes);

// Обработка ошибок
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
