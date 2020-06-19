export default interface ICourse {
  getId: () => string;
  getUserId: () => string;
  setUserId: (userId: string) => Promise<void>;
  setName: (name: string) => Promise<void>;
  getName: () => string;
  getSubscribers: () => Array<string>;
  setReleaseDate: (releaseDate: Date) => Promise<void>;
  getReleaseDate: () => Date;
  getToken: () => string;
  toObject: () => { id: string; name: string; releaseDate: Date };
  isOwner: (userId: string) => boolean;
  isSubscriber: (userId: string) => boolean;
  addSubscriber: (userId: string) => Promise<void>;
  remove: () => Promise<void>;
}
