import { UserDTO } from "./user";

export interface LoginDTO {
  username: string;
  password: string;
}

export interface LoginResponseDTO {
  data: {
    token: string;
    user: UserDTO;
  };
}

export interface LoginFailedResponseDTO {
  data: {
    message: string;
    code: number;
  };
}
