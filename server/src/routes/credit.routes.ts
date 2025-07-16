import { Router } from 'express'
import {
  getUserCredits,
  addCredits,
  spendCredits,
  transferCredits,
  creditHistory,
} from '../controllers/credit.controller'
import { verifyToken } from '../middleware/verifyToken'

const router = Router()

router.get('/:userId', verifyToken, getUserCredits)
router.post('/earn', verifyToken, addCredits)
router.post('/spend', verifyToken, spendCredits)
router.post('/transfer', verifyToken, transferCredits)
router.get('/history/me', verifyToken, creditHistory)

export default router