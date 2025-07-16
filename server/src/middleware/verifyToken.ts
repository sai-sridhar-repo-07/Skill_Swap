import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'

export interface AuthRequest extends Request {
  userId?: string,
  user?: {
    name?: string;
    email?: string;
    skillsToLearn?: string[];
    skillsToTeach?: string[];
  }
}

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; version: number }
    const user = await User.findById(decoded.id)

    if (!user || user.tokenVersion !== decoded.version) {
      return res.status(401).json({ message: 'Token version mismatch (refresh required)' })
    }

    req.userId = decoded.id
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}
