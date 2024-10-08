import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'Username already exist'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exist'],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    profile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
