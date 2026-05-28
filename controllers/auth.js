import HttpErrors from "http-errors";

import Users from '../models/appUsers.js';

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

      req.session.user = {
        id: user.id,
        username: user.name,
        email: user.email,
      };

      delete user.password;

      res.status(200).json({
        message: 'Logged in',
        user: req.session.user,
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
      if (!req.session.user) {
        throw new HttpErrors(401, {
          message: 'Unauthorized',
        });
      }

      const user = await Users.findById(req.session.user.id);

      if (!user) {
        throw new HttpErrors(401, {
          message: 'Users not found',
        });
      }

      delete user.password;

      res.json({
        user,
      });
    } catch (e) {
      next(e);
    }
  },

  async logout(req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) {
          next(err);
          return;
        }

        res.clearCookie('cookie.sid');

        res.json({
          message: 'Logged out',
        });
      });

    } catch (error) {
      next(error);
    }
  },
}