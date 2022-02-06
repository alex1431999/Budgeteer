import { MongoClient } from 'mongodb';

const dbName = 'cluster0';
const url = process.env.MONGO_URL;
const client = new MongoClient(url);

const isConnected = false;

const getDb = async () => {
  if (!isConnected) {
    await client.connect();
  }

  return client.db(dbName);
};

export {
  client,
  getDb,
};
