// server/src/db/mongo.ts
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 
  'mongodb+srv://tarrasridhar1154:6309816942@cluster0.gmiuvyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Atlas connected');
  } catch (err) {
    console.error('Atlas connection error:', err);
    process.exit(1);
  }
};