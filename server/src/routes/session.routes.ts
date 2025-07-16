import { Router } from 'express'
import {
  createSession,
  getAvailableSessions,
  bookSession,
  joinSession,
  rateSession,
  getRecommendedTeachers,
} from '../controllers/session.controller'
import { verifyToken } from '../middleware/verifyToken'

const router = Router()

router.post('/', verifyToken, createSession)
router.get('/available', getAvailableSessions)
router.post('/:id/book', verifyToken, bookSession)
router.get('/:id/join', verifyToken, joinSession)
router.post('/:id/feedback', verifyToken, rateSession)
router.get('/recommendations', verifyToken, getRecommendedTeachers)

export default router