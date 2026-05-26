import HttpErrors from "http-errors";

import Persons from '../models/persons.js';

export default {
  async create(req, res, next) {
    try {
      const person = await Persons.create(req.body);

      if (!person) {
        throw new HttpErrors(500, 'Failed to create person');
      }

      res.status(200).json({
        person,
      });
    } catch (e) {
      next(e);
    }
  },

  async getAll(req, res, next) {
    try {
      const persons = await Persons.findAll();

      if (!persons) {
        throw new HttpErrors(500, 'Failed to find persons');
      }

      res.json({
        persons,
        count: persons.length,
      });
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const person = await Persons.update(req.params.id, req.body);

      if (!person) {
        throw new HttpErrors(500, 'Failed to update person');
      }

      res.json({
        message: 'Person updated successfully',
      });
    } catch (e) {
      next(e);
    }
  },

  async deletePerson(req, res, next) {
    try {
      const person = await Persons.deletePerson(req.params.id);

      if (!person) {
        throw new HttpErrors(500, 'Failed to delete person');
      }

      res.json({
        message: 'Person deleted successfully',
        count: person.count,
      });
    } catch (e) {
      next(e);
    }
  }
}