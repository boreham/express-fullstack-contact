interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    text: string;
  }
  
  const validateContactForm = (
    data: ContactFormData
  ): { valid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};
  
    if (!data.firstName || data.firstName.trim() === '') {
      errors.firstName = 'Имя обязательно';
    }
  
    if (!data.lastName || data.lastName.trim() === '') {
      errors.lastName = 'Фамилия обязательна';
    }
  
    if (!data.email || data.email.trim() === '') {
      errors.email = 'Email обязателен';
    } else if (!validateEmail(data.email)) {
      errors.email = 'Неверный формат email';
    }
  
    if (!data.phone || data.phone.trim() === '') {
      errors.phone = 'Телефон обязателен';
    }
  
    if (!data.text || data.text.trim() === '') {
      errors.text = 'Текст сообщения обязателен';
    }
  
    return { valid: Object.keys(errors).length === 0, errors };
  };
  
  const validateEmail = (email: string): boolean => {
    // Простейшая проверка email
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  
  export { validateContactForm };
  