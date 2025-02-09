import { Request, Response } from 'express';
import contactService from '../services/contactService';
import { validateContactForm } from '../utils/validation';

const submitContact = async (req: Request, res: Response): Promise<any> => {
    try {
        // Извлекаем поля из тела запроса
        const { firstName, lastName, email, phone, text } = req.body;
        // Получаем прикреплённый файл (если имеется)
        const attachment = req.file;

        // Валидируем входные данные
        const { valid, errors } = validateContactForm({ firstName, lastName, email, phone, text });
        if (!valid) {
            return res.status(400).json({ errors });
        }

        // Формируем объект с данными контакта
        const contactData = {
            firstName,
            lastName,
            email,
            phone,
            text,
            attachmentPath: attachment ? attachment.path : null,
        };

        // Передаём данные в сервис для дальнейшей обработки
        const result = await contactService.processContactSubmission(contactData);

        return res.status(201).json({ message: 'Contact form submitted successfully', data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default {
    submitContact,
};
