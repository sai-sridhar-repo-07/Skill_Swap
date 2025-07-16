import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'

export interface AuthRequest extends Request {
  userId?: string
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ msg: 'No token provided' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string }
    req.userId = decoded.id
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' })
  }
}
