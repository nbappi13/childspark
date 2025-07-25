// lib/mongodb.ts

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  /* eslint-disable no-var */
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}


if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}


export type { MongoClient };

// export with correct type
export default clientPromise;
