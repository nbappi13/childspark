import { MongoClient } from "mongodb";

// Load the MongoDB connection 
const uri = process.env.MONGODB_URI!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

// Extend the global object to allow reuse of the MongoClient during development
declare global {
  // Allow reuse of the MongoDB connection across hot reloads in dev
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Ensure MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to your .env file");
}

// In development, reuse the global connection to avoid creating multiple clients
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, always create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}


export default clientPromise;
