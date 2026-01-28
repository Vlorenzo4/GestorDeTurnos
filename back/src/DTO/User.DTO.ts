export interface IUserRegisterDTO {
  name: string;
  email: string;
  birthdate: Date;
  nDni: number;
  username: string;
  password: string;
}

export interface IUserRegisterResponse {
  name: string;
  email: string;
}

export interface IUserLoginDTO {
  username: string;
  password: string;
}
