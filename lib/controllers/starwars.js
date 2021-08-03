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
    try {
      const characters = await StarWars.getAll();

      res.send(characters);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const character = {
        id: '1',
        character: 'Han Solo',
        weapon: 'DL-44 Heavy Blaster Pistol',
        forceUser: false,
        homePlanet: 'Corellia',
        race: 'Human'
      };

      res.send(character);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {})
  .delete('/:id', async (req, res, next) => {});
