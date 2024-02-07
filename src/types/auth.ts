export namespace Login {
  export interface Request {
    UserName: string;
    Password: string;
  }

  export interface Response {
    SessionId: string,
  }
}
