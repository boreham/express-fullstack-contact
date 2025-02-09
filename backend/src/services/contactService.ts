import contactRepository from '../repositories/contactRepository';
import nodemailer from 'nodemailer';

export interface ContactData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    text: string;
    attachmentPath: string | null;
}

/**
 * Функция для отправки email уведомления о новой заявке.
 * Принимает объект сохранённых данных контакта, включающий id.
 */
const sendEmailNotification = async (contactData: ContactData & { id: number }) => {
    // Создаём транспортер, используя настройки из переменных окружения
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_PORT === '465', // true для порта 465, иначе false
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Настраиваем письмо
    const mailOptions = {
        from: process.env.EMAIL_FROM, // От кого
        to: process.env.EMAIL_TO,     // Кому
        subject: `Новая заявка с формы обратной связи #${contactData.id}`,
        text: `
Новая заявка с формы обратной связи:

Имя: ${contactData.firstName} ${contactData.lastName}
Email: ${contactData.email}
Телефон: ${contactData.phone}
Сообщение: ${contactData.text}
Вложение: ${contactData.attachmentPath ? contactData.attachmentPath : "Отсутствует"}
    `,
    };

    // Отправляем письмо
    await transporter.sendMail(mailOptions);
};

const processContactSubmission = async (contactData: ContactData) => {
    // Сохраняем данные через репозиторий
    const savedContact = await contactRepository.save(contactData);

    // После успешного сохранения отправляем уведомление на email
    try {
        await sendEmailNotification(savedContact);
        console.log('Email уведомление успешно отправлено');
    } catch (error) {
        console.error('Ошибка при отправке email уведомления:', error);
        // При необходимости можно реализовать логику повторной отправки или уведомления об ошибке
    }

    return savedContact;
};

export default {
    processContactSubmission,
};
