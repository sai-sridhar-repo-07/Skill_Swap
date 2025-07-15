import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  skills: string[];
  interests: string[];
  creditBalance: number;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  skills: { type: [String], default: [] },
  interests: { type: [String], default: [] },
  creditBalance: { type: Number, default: 10 },
});

export const User = model<IUser>('User', userSchema);