import { Request, Response } from 'express'
import { User } from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AppDataSource } from '../db/postgres'
import { CreditAccount } from '../models/pg/CreditAccount'


const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'
const JWT_EXPIRES_IN = '15m'

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ msg: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashedPassword })

    // ⬇️ Create credit ledger in Supabase
    await AppDataSource.getRepository(CreditAccount).save({
      userId: user._id.toString(),
      balance: 0,
      totalEarned: 0,
      totalSpent: 0,
    })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    })
  } catch (err) {
    res.status(500).json({ msg: 'Signup failed', error: err })
  }
}


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ msg: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

    const token = jwt.sign(
      { id: user._id, version: user.tokenVersion },
      JWT_SECRET,
      { expiresIn: '15m' }
    )

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    })
  } catch (err) {
    res.status(500).json({ msg: 'Login failed', error: err })
  }
}

export const logout = async (_: Request, res: Response) => {
  res.status(200).json({ msg: 'Logged out (handled on client)' })
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body
    if (!token) return res.status(400).json({ message: 'Token missing' })

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string }
    const newToken = jwt.sign({ id: decoded.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    })

    return res.json({ token: newToken })
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
}
