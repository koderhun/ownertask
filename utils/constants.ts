interface User {
  id: string
  email: string
  password: string
}

export const users: User[] = [
  {
    id: '1',
    email: 'a@a.com',
    password: 'a',
  },
  {
    id: '2',
    email: 'b@b.com',
    password: 'b',
  },
]
