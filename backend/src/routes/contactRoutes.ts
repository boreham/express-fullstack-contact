import { Router } from 'express';
import multer from 'multer';
import contactController from '../controllers/contactController';

// Конфигурация хранилища для Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Убедитесь, что папка "uploads/" существует
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const router = Router();

// Маршрут для отправки формы обратной связи
// Поле для загрузки файла называется "attachment"
router.post('/', upload.single('attachment'), contactController.submitContact);

export default router;
