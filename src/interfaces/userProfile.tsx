export interface GenericResponse {
  status: string;
  message: string;
}

export interface IResetPasswordRequest {
  resetToken: string;
  password: string;
  passwordConfirm: string;
}

export interface IUser {
  name?: string;
  email?: string;
  notification?: number;
  numberEmail?: number;
}