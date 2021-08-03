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
      const { id } = req.params;
      const character = await StarWars.getById(id);

      res.send(character);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { character, weapon, forceUser, homePlanet, race } = req.body;

      const updatedCharacter = await StarWars.updateById(id, { character, weapon, forceUser, homePlanet, race });

      res.send(updatedCharacter);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCharacter = await StarWars.deleteById(id);

      res.send({
        message: `${deletedCharacter.character} has been deleted.`
      });
    } catch (err) {
      next(err);
    }
  });
