import { Request, Response } from 'express'
import { AppDataSource } from '../db/postgres'
import { CreditAccount } from '../models/pg/CreditAccount'
import { CreditTransaction } from '../models/pg/CreditTransaction'
import { AuthRequest } from '../middleware/verifyToken'

export const getUserCredits = async (req: AuthRequest, res: Response) => {
  const { userId } = req.params
  const repo = AppDataSource.getRepository(CreditAccount)
  const account = await repo.findOneBy({ userId })
  if (!account) return res.status(404).json({ message: 'Account not found' })
  return res.json(account)
}

export const addCredits = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  const { amount } = req.body
  const accountRepo = AppDataSource.getRepository(CreditAccount)
  const txRepo = AppDataSource.getRepository(CreditTransaction)

  const account = await accountRepo.findOneBy({ userId })
  if (!account) return res.status(404).json({ message: 'Account not found' })

  account.balance += amount
  account.totalEarned += amount
  await accountRepo.save(account)

  const tx = txRepo.create({ userId, type: 'earn', amount })
  await txRepo.save(tx)

  return res.json({ message: 'Credits added', balance: account.balance })
}

export const spendCredits = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  const { amount } = req.body
  const accountRepo = AppDataSource.getRepository(CreditAccount)
  const txRepo = AppDataSource.getRepository(CreditTransaction)

  const account = await accountRepo.findOneBy({ userId })
  if (!account || account.balance < amount)
    return res.status(400).json({ message: 'Insufficient credits' })

  account.balance -= amount
  account.totalSpent += amount
  await accountRepo.save(account)

  const tx = txRepo.create({ userId, type: 'spend', amount })
  await txRepo.save(tx)

  return res.json({ message: 'Credits spent', balance: account.balance })
}

export const transferCredits = async (req: AuthRequest, res: Response) => {
  const senderId = req.userId
  const { recipientId, amount } = req.body

  const accountRepo = AppDataSource.getRepository(CreditAccount)
  const txRepo = AppDataSource.getRepository(CreditTransaction)

  const sender = await accountRepo.findOneBy({ userId: senderId })
  const recipient = await accountRepo.findOneBy({ userId: recipientId })

  if (!sender || sender.balance < amount)
    return res.status(400).json({ message: 'Insufficient credits' })
  if (!recipient)
    return res.status(404).json({ message: 'Recipient not found' })

  sender.balance -= amount
  sender.totalSpent += amount
  recipient.balance += amount
  recipient.totalEarned += amount

  await accountRepo.save([sender, recipient])

  const tx = txRepo.create({ userId: senderId, type: 'transfer', amount, recipientId })
  await txRepo.save(tx)

  return res.json({ message: 'Transfer successful' })
}

export const creditHistory = async (req: AuthRequest, res: Response) => {
  const userId = req.userId
  const txRepo = AppDataSource.getRepository(CreditTransaction)
  const history = await txRepo.find({ where: { userId }, order: { createdAt: 'DESC' } })
  return res.json({ history })
}