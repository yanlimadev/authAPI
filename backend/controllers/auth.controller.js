import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail } from '../mail/emails.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Throws an error if one of the fields is empty
    if (!name || !email || !password) {
      throw new Error('All fields required!');
    }

    // Throws an error if there is a user in the database with the same email
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists!' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    // Send user data to database
    await user.save();

    generateTokenAndSetCookie(res, user._id);

    sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: 'user created successfully',
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  res.send('login route!');
};

export const logout = async (req, res) => {
  res.send('logout route!');
};
