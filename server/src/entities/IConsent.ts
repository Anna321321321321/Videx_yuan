export default interface IConsent {
  setUserName(name: string): void;
  getUserName(): string;
  setUserEmail(email: string): void;
  getUserEmail(): string;
  getUserId: () => string;
  setUserId: (id: string) => void;
  getConsentDate: () => void;
  setConsentDate: (date: Date) => void;
  toObject: () => {
    id: string;
    userName: string;
    userId: string;
    userEmail: string;
    consentDate: Date;
  };
  setNameEmailId(name: string, email: string, userid: string): void;
  getId: () => string;
}
