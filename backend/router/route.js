import { Router } from 'express';
import {
  generateOTP,
  getUser,
  login,
  register,
  resetPassword,
  resetSession,
  updateUser,
  verifyOTP,
} from '../controllers/app.controller.js';
const router = Router();

// POST Methods
router.post('/register', register);
// router.post('/registerMail', (req, res) => {
//   res.json('Hello World');
// });
router.post('authenticate', (req, res) => {
  res.json('Hello World');
});
router.post('/login', login);

// GET Methods
router.get('/user/:username', getUser);
router.get('/generateOTP', generateOTP);
router.get('/verifyOTP', verifyOTP);
router.get('/resetSession', resetSession);

// PUT Methods
router.put('/updateUser', updateUser);

router.put('/resetPassword', resetPassword);

export default router;
