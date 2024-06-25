# Запускать можно черех 
```
docker compose up
```
Или локально как обычное nextjs приложение
```
pnpm i
```
запуск
```
pnpm dev
```

Есть уже заранее сохраненные креды.
```
  {
    email: 'admin@ya.ru',
    password: 'admin',
  },
  {
    email: 'name@domain.zone',
    password: 'password',
  },
  {
    email: 'user@ya.ru',
    password: '123456Up',
  }
```

Работать будет только `user@ya.ru` потому что есть валидация на правильные пароли и логины.
