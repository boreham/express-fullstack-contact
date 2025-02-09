### Тестирование REST API с помощью curl

### 1. Отправка JSON-данных (без вложения)
```sh
curl -X POST http://localhost:3000/api/contacts \
     -H "Content-Type: application/json" \
     -d '{
           "firstName": "Иван",
           "lastName": "Иванов",
           "email": "ivan@example.com",
           "phone": "+79998887766",
           "text": "Тестовое сообщение"
         }'
```
### Ожидаемый ответ (успех, код 201):
```
{
  "message": "Contact form submitted successfully",
  "data": {
    "id": 1,
    "firstName": "Иван",
    "lastName": "Иванов",
    "email": "ivan@example.com",
    "phone": "+79998887766",
    "text": "Тестовое сообщение",
    "attachmentPath": null
  }
}
```
### Если данные некорректны (ошибка валидации, код 400):
```sh
{
  "errors": {
    "email": "Invalid email format"
  }
}
```
### 2. Отправка JSON-данных с вложением (файл)
```sh
curl -X POST http://localhost:3000/api/contacts \
     -H "Content-Type: multipart/form-data" \
     -F "firstName=Иван" \
     -F "lastName=Иванов" \
     -F "email=ivan@example.com" \
     -F "phone=+79998887766" \
     -F "text=Тестовое сообщение с файлом" \
     -F "attachment=@/path/to/file.pdf"
```
### Ожидаемый ответ (код 201):
```
{
  "message": "Contact form submitted successfully",
  "data": {
    "id": 2,
    "firstName": "Иван",
    "lastName": "Иванов",
    "email": "ivan@example.com",
    "phone": "+79998887766",
    "text": "Тестовое сообщение с файлом",
    "attachmentPath": "uploads/file.pdf"
  }
}
```

### 3. Проверка неправильного запроса
```sh
curl -X POST http://localhost:3000/api/contacts \
     -H "Content-Type: application/json" \
     -d '{
           "firstName": "Иван",
           "lastName": "Иванов",
           "phone": "+79998887766",
           "text": "Ошибка теста"
         }'
```
### Ожидаемый ответ (код 400):
```
{
  "errors": {
    "email": "Email is required"
  }
}
```