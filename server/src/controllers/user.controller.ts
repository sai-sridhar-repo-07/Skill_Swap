import { Request, Response } from 'express'
import { User } from '../models/User'
import { AuthRequest } from '../middleware/verifyToken'

export const getMe = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.userId).select('-password')
  if (!user) return res.status(404).json({ msg: 'User not found' })

  res.json(user)
}
