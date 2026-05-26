import HttpErrors from "http-errors";
import jwt from 'jsonwebtoken';

import Users from '../models/appUsers.js';

const {JWT_SECRET, NODE_ENV, COOKIE_MAX_AGE} = process.env;

export default {
  async login(req, res, next) {
    try {
      const {email, password} = req.body;

      const user = await Users.findByEmail(email);

      if (!user || (user.password !== Users.hashPassword(password))) {
        throw new HttpErrors(401, {
          errors: {
            email: "Invalid email or password",
          }
        });
      }

      const token = jwt.sign(
        { userId: user.id },
      JWT_SECRET,
        { expiresIn: "24h" },
      );

      delete user.password;

      res.cookie('token', token, {
        signed: true,
        httpOnly: true,
        sameSite: 'lax',
        secure: NODE_ENV === 'production',
        maxAge: Number(COOKIE_MAX_AGE),
      });

      res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (e) {
      next(e);
    }
  },

  async register(req, res, next) {
    try {
      const {email, password, age, name} = req.body;

      if (await Users.checkEmailUnique(email)) {
        throw new HttpErrors(422, {
          errors: {
            email: 'Email is already in use',
          },
        });
      }

      const user = await Users.create({
        name,
        age,
        email,
        password: Users.hashPassword(password),
      });

      delete user.password;

      res.json({
        message: 'User registered successfully.',
        user,
      });
    } catch (e) {
      next(e);
    }
  },

  async me(req, res, next) {
    try {
      const user = await Users.findById(req.userId);

      if (!user) {
        throw new HttpErrors(404, 'User not found');
      }

      res.json({
        user,
      });
    } catch (e) {
      next(e);
    }
  },

  async logout(req, res, next) {
    try {
      res.clearCookie('token', {
        signed: true,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });

      res.json({
        message: 'Logged out',
      });
    } catch (error) {
      next(error);
    }
  },
}