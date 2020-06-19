export enum UserType {
  Student,
  Teacher,
  GlobalAdministrator
}

export interface GETUser {
  id: string;
  name: string;
  email: string;
  type: UserType;
}
