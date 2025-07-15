import express from 'express';
import { register, login } from '../auth';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { user, token } = await register(req.body.email, req.body.password, req.body.name);
    res.status(201).json({ user, token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { user, token } = await login(req.body.email, req.body.password);
    res.json({ user, token });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

export default router;