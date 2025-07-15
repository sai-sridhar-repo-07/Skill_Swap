import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../services/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const register = async (email: string, password: string, name: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ email, password: hashedPassword, name });
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
  return { user, token };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
  return { user, token };
};