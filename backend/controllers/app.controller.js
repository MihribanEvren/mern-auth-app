import User from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// POST
export async function register(req, res) {
  const { username, email, password, profile } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }
  const userNameExist = await User.findOne({ username });
  const emailExist = await User.findOne({ email });

  if (userNameExist) {
    return res.status(409).json({ message: 'Username already exist' });
  }
  if (emailExist) {
    return res.status(409).json({ message: 'Email already exist' });
  }

  const newUser = new User({
    username,
    email,
    password: await bcrypt.hash(password, 10),
    profile: profile || '',
  });
  try {
    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).send({ message: 'Server Error' });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: 'Invalid password' });
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
    return res.status(500).json({ message: 'Server Error' });
  }
}

// GET
export async function getUser(req, res) {
  const { username } = req.params;
  if (!username) {
    return res.status(501).json({ message: 'Invalid Username' });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Secret data like password should not be sent to the client
    const { password, ...rest } = Object.assign({}, user.toJSON());

    return res.status(200).json(rest);
  } catch (error) {
    return res.status(500).send({ message: 'Server Error' });
  }
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
  //   const { id } = req.query;
  const { userId } = req.user;
  let { password, ...rest } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).send('No user with that id');
  }
  try {
    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    const updatedData = { ...rest, ...(password && { password }) };

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function resetPassword(req, res) {
  res.json('Hello World');
}
