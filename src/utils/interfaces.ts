interface ICreateUser {
  name: string;
  currentClass: string;
  token: string;
}

interface IUser {
  id: number;
  name: string;
  class: string;
  token: string;
}

export { ICreateUser, IUser };
