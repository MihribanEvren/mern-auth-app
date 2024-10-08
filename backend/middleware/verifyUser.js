import User from '../model/User.model.js';

export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method === 'GET' ? req.query : req.body;

    let exist = await User.findOne({ username });
    if (!exist) {
      return res.status(400).json({ message: 'User not found' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Authentication failed' });
  }
}
