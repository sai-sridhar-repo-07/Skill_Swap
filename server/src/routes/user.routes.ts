import { Router } from 'express'
import { deleteAccount, getMe, updateProfile } from '../controllers/user.controller'
import { verifyToken } from '../middleware/verifyToken'

const router = Router()

router.get('/me', verifyToken, getMe)
router.patch('/me', verifyToken, updateProfile)
router.delete('/me', verifyToken, deleteAccount)

export default router
