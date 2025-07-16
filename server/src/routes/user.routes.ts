import { Router } from 'express'
import { getMe } from '../controllers/user.controller'
import { verifyToken } from '../middleware/verifyToken'

const router = Router()

router.get('/me', verifyToken, getMe)

export default router
