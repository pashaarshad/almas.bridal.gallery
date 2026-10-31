import { MongoClient } from "mongodb";

// MongoDB Atlas Connection URI directly configured with fallback to env
const DEFAULT_MONGODB_URI =
  "mongodb+srv://riyazmanwa_db_user:FcgtlfWL8BBoOlKG@almasofficial.tqjgua4.mongodb.net/almas_bridal_db?retryWrites=true&w=majority&appName=almasofficial";

const uri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
