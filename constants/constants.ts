interface user {
  email: string
  password: string
}

export const users: user[] = [
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
    password: 'user',
  }
]