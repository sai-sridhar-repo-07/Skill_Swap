import { Request, Response } from 'express'
import { Session } from '../models/Session'
import { Feedback } from '../models/Feedback'
import { AppDataSource } from '../db/postgres'
import { CreditAccount } from '../models/pg/CreditAccount'
import { CreditTransaction } from '../models/pg/CreditTransaction'
import { AuthRequest } from '../middleware/verifyToken'

export const createSession = async (req: AuthRequest, res: Response) => {
  const { topic, description, startTime, duration } = req.body
  const hostId = req.userId

  try {
    const session = await Session.create({
      hostId,
      topic,
      description,
      startTime,
      duration,
    })
    res.status(201).json({ message: 'Session created', session })
  } catch (err) {
    res.status(500).json({ message: 'Failed to create session', error: err })
  }
}

export const getAvailableSessions = async (req: Request, res: Response) => {
  const sessions = await Session.find({ status: 'pending', startTime: { $gte: new Date() } })
  res.json(sessions)
}

export const bookSession = async (req: AuthRequest, res: Response) => {
  const learnerId: string = req.userId ?? ""
  const { id } = req.params

  const session = await Session.findById(id)
  if (!session || session.status !== 'pending')
    return res.status(400).json({ message: 'Session not available' })

  if (session.hostId === learnerId)
    return res.status(403).json({ message: 'You cannot book your own session' })

  const creditRepo = AppDataSource.getRepository(CreditAccount)
  const txRepo = AppDataSource.getRepository(CreditTransaction)

  const learner = await creditRepo.findOneBy({ userId: learnerId })
  if (!learner || learner.balance < 1)
    return res.status(400).json({ message: 'Insufficient credits' })

  learner.balance -= 1
  learner.totalSpent += 1
  await creditRepo.save(learner)

  await txRepo.save(txRepo.create({ userId: learnerId, type: 'spend', amount: 1 }))

  session.learnerId = learnerId ?? ''
  session.status = 'booked'
  await session.save()

  res.json({ message: 'Session booked', session })
}

export const joinSession = async (req: AuthRequest, res: Response) => {
  const { id } = req.params
  const session = await Session.findById(id)

  if (!session || session.status === 'pending')
    return res.status(400).json({ message: 'Session not ready to join' })

  const joinLink = session.meetingLink || `https://meet.example.com/${session._id}`
  res.json({ joinLink })
}

export const rateSession = async (req: AuthRequest, res: Response) => {
  const { id } = req.params
  const { rating, feedback } = req.body
  const userId = req.userId

  const session = await Session.findById(id)
  if (!session || session.status !== 'booked')
    return res.status(400).json({ message: 'Cannot rate session' })

  if (session.hostId === userId)
    return res.status(403).json({ message: 'You cannot rate your own session' })

  if (session.learnerId !== userId)
    return res.status(403).json({ message: 'You can only rate sessions you attended' })

  await Feedback.create({
    sessionId: id,
    fromUserId: userId,
    toUserId: session.hostId,
    rating,
    comment: feedback,
  })

  session.status = 'completed'
  await session.save()

  res.json({ message: 'Feedback submitted. Thank you!' })
}

export const getRecommendedTeachers = async (req: AuthRequest, res: Response) => {
  const user = req.user
  const userSkillsToLearn = user?.skillsToLearn || []

  const recommended = await Session.aggregate([
    { $match: { status: 'pending' } },
    {      $addFields: {
        score: {
          $cond: [{ $in: ['$topic', userSkillsToLearn] }, 1, 0],
        },
      },
    },
    { $sort: { score: -1, startTime: 1 } },
    { $limit: 10 },
  ])

  res.json(recommended)
}
