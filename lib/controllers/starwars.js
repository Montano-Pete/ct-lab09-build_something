import { Router } from 'express';
import StarWars from '../models/StarWars';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const character = await StarWars.insert(req.body);

      res.send(character);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
  })
  .get('/:id', async (req, res, next) => {
  })
  .put('/:id', async (req, res, next) => {
  })
  .delete('/:id', async (req, res, next) => {
  });

