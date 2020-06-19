import { MongoDB } from 'videx/server/mongodb';

export default async () => {
  await MongoDB.init();
  await MongoDB.populateDB();
};
