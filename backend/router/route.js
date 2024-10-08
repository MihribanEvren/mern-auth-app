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
import { verifyUser } from '../middleware/verifyUser.js';
import { authenticate, localVariables } from '../middleware/authenticate.js';
const router = Router();

// POST Methods
router.post('/register', register);
// router.post('/registerMail', (req, res) => {
//   res.json('Hello World');
// });
router.post('/authenticate', (req, res) => {
  res.json('Hello World');
});
router.post('/login', verifyUser, login);

// GET Methods
router.get('/user/:username', getUser);
router.get('/generateotp', verifyUser, localVariables, generateOTP);
router.get('/verifyotp', verifyOTP);
router.get('/resetsession', resetSession);

// PUT Methods
router.put('/user', authenticate, updateUser);

router.put('/resetpassword', verifyUser, resetPassword);

export default router;
