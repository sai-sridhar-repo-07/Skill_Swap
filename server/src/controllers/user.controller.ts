import { Request, Response } from 'express'
import { User } from '../models/User'
import { AuthRequest } from '../middleware/verifyToken'
import { CreditAccount } from '../models/pg/CreditAccount'
import { AppDataSource } from '../db/postgres'

export const getMe = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.userId).select('-password')
  if (!user) return res.status(404).json({ msg: 'User not found' })

  res.json(user)
}

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    const { name, avatar, skillsToTeach, skillsToLearn } = req.body

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(avatar && { avatar }),
        ...(skillsToTeach && { skillsToTeach }),
        ...(skillsToLearn && { skillsToLearn }),
      },
      { new: true }
    ).select('-password')

    if (!updatedUser)
      return res.status(404).json({ message: 'User not found' })

    res.status(200).json({ user: updatedUser })
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err })
  }
}

export const deleteAccount = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId

    // Delete user from MongoDB
    const user = await User.findByIdAndDelete(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    // Delete credit account from Supabase (PostgreSQL)
    await AppDataSource.getRepository(CreditAccount).delete({ userId })

    res.status(200).json({ message: 'User and credit account deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete account', error: err })
  }
}
