// lib/mongodb.ts

import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

let client
let clientPromise

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable 
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise.
export default clientPromise
