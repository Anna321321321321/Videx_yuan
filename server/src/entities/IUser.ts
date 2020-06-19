export default interface IUser {
  setName(name: string): void;
  setToken(token: string): void;
  setUserPrincipalName(userPrincipalName: string): void;
  getUserPrincipalName(): string;
  setType(type: number): Promise<void>;
  isStudent(): boolean;
  isTeacher(): boolean;
  isGlobalAdministrator(): boolean;
  toObject: () => {
    id: string;
    name: string;
    type: number;
    email: string;
  };
  getId: () => string;
  getToken: () => string;
}
