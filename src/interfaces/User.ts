interface User {
  name: string;
  currentClass: string;
  token: string;
}

interface UserDB extends User {
  id: number;
}

export { User, UserDB };
