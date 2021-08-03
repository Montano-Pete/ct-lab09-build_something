import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import StarWars from '../lib/models/StarWars.js';

describe('starWars routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a starWars character via POST', async () => {
    const character  = {
      character: 'Luke Skywalker',
      weapon: 'Lightsaber',
      forceUser: true,
      homePlanet: 'Tatooine'
    };

    const res = await request(app)
      .post('/api/v1/starwars')
      .send(character);

    expect(res.body).toEqual({
      id: '1',
      ...character
    });
  });
});
