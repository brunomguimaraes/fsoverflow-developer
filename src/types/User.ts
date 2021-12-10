interface User {
  name: string;
  currentClass: string;
  token?: string;
}

interface UserDB extends Omit<User, 'token'> {
  id: number;
  token: string;
}

export { User, UserDB };
