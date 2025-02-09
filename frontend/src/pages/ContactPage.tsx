import React, { useState, ChangeEvent, FormEvent } from 'react';
import contactService from '../services/contactService';
import { validateEmail } from '../utils/validation';
import {
  Container,
  Title,
  Form,
  Input,
  ErrorMessage,
  TextArea,
  Button,
  SuccessMessage
} from '../styles/ContactStyle';


const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    text: '',
  });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string>('');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  const validateForm = (): boolean => {
    const tempErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      tempErrors.firstName = 'Имя обязательно';
    }
    if (!formData.lastName.trim()) {
      tempErrors.lastName = 'Фамилия обязательна';
    }
    if (!formData.email.trim()) {
      tempErrors.email = 'Email обязателен';
    } else if (!validateEmail(formData.email)) {
      tempErrors.email = 'Некорректный email';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Телефон обязателен';
    }
    if (!formData.text.trim()) {
      tempErrors.text = 'Текст сообщения обязателен';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess('');
    if (!validateForm()) return;

    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('text', formData.text);
    if (attachment) {
      data.append('attachment', attachment);
    }

    try {
      const response = await contactService.submitContact(data);
      if (response.status === 201) {
        setSuccess('Форма успешно отправлена!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          text: '',
        });
        setAttachment(null);
        setErrors({});
      }
    } catch (error) {
      console.error(error);
      setErrors({ submit: 'Ошибка отправки формы' });
    }
  };

  return (
    <Container>
      <Title>Форма обратной связи</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="firstName"
          placeholder="Имя"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}

        <Input
          type="text"
          name="lastName"
          placeholder="Фамилия"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

        <Input
          type="tel"
          name="phone"
          placeholder="Телефон"
          value={formData.phone}
          onChange={handleInputChange}
        />
        {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}

        <Input type="file" name="attachment" onChange={handleFileChange} />

        <TextArea
          name="text"
          placeholder="Сообщение"
          rows={5}
          value={formData.text}
          onChange={handleInputChange}
        />
        {errors.text && <ErrorMessage>{errors.text}</ErrorMessage>}

        <Button type="submit">Отправить</Button>
        {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </Form>
    </Container>
  );
};

export default ContactPage;
