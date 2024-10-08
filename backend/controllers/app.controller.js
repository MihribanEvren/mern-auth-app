import User from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// POST
export async function register(req, res) {
  try {
    const { username, email, password, profile } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const userNameExist = await User.findOne({ username });
    const emailExist = await User.findOne({ email });

    if (userNameExist) {
      return res.status(400).json({ message: 'Username already exist' });
    }
    if (emailExist) {
      return res.status(400).json({ message: 'Email already exist' });
    }

    const user = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      profile: profile || ' ',
    });

    await user.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res
      .status(200)
      .json({ message: 'Login successful', username: user.username, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// GET
export async function getUser(req, res) {
  res.json('Hello World');
}

export async function generateOTP(req, res) {
  res.json('Hello World');
}

export async function verifyOTP(req, res) {
  res.json('Hello World');
}

export async function resetSession(req, res) {
  res.json('Hello World');
}

// PUT
export async function updateUser(req, res) {
  res.json('Hello World');
}

export async function resetPassword(req, res) {
  res.json('Hello World');
}
