import HttpErrors from "http-errors";

import Names from '../models/directoryUsers.js';

export default {
  async getUnique(req, res, next) {
    try {
      const names = await Names.getUnique();

      if (!names) {
        throw new HttpErrors(500, 'Failed to get names');
      }

      res.json({
        names,
        count: names.length,
      });
    } catch (e) {
      next(e);
    }
  },

  async getAll(req, res, next) {
    try {
      const names = await Names.getAll();

      if (!names) {
        throw new HttpErrors(500, 'Failed to get names');
      }

      res.json({
        names,
        count: names.length,
      });
    } catch (e) {
      next(e);
    }
  },

  async getByLast(req, res, next) {
    try {
      const names = await Names.getByLast();

      if (!names) {
        throw new HttpErrors(500, 'Failed to get names');
      }

      res.json({
        names,
        count: names.length,
      });
    } catch (e) {
      next(e);
    }
  },
}

