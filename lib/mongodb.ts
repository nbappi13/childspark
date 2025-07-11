// lib/mongodb.ts

import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

let client
let clientPromise

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable 
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri as string)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode
  client = new MongoClient(uri as string)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise.
export default clientPromise
