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
      const characters = [
        {
          character: 'Luke Skywalker',
          forceUser: true,
          homePlanet: 'Tatooine',
          id: '1',
          race: 'Human',
          weapon: 'Lightsaber',
        },
        {
          character: 'Han Solo',
          forceUser: false,
          homePlanet: 'Corellia',
          id: '2',
          race: 'Human',
          weapon: 'DL-44 Heavy Blaster Pistol',
        },
        {
          character: 'General Grievous',
          forceUser: false,
          homePlanet: 'Kalee',
          id: '3',
          race: 'Cyborg Kaleesh',
          weapon: 'Lightsabers',
        },
      ];
      res.send(characters);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {})
  .put('/:id', async (req, res, next) => {})
  .delete('/:id', async (req, res, next) => {});
