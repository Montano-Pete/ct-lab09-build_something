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
      homePlanet: 'Tatooine',
      race: 'human'
    };

    const res = await request(app)
      .post('/api/v1/starwars')
      .send(character);

    expect(res.body).toEqual({
      id: '1',
      ...character
    });
  });

  it('gets all starWars characters via GET', async () => {
    const lukeSkywalker = await StarWars.insert({
      character: 'Luke Skywalker',
      weapon: 'Lightsaber',
      forceUser: true,
      homePlanet: 'Tatooine',
      race: 'Human'
    });
    const hanSolo = await StarWars.insert({
      character: 'Han Solo',
      weapon: 'DL-44 Heavy Blaster Pistol',
      forceUser: false,
      homePlanet: 'Corellia',
      race: 'Human'
    });
    const generalGrievous = await StarWars.insert({
      character: 'General Grievous',
      weapon: 'Lightsabers',
      forceUser: false,
      homePlanet: 'Kalee',
      race: 'Cyborg Kaleesh'
    });
    
    const res = await request(app).get('/api/v1/starwars');

    expect(res.body).toEqual([lukeSkywalker, hanSolo, generalGrievous]);
  });

  it('get a character by id via GET', async () => {
    const character = await StarWars.insert({
      character: 'Han Solo',
      weapon: 'DL-44 Heavy Blaster Pistol',
      forceUser: false,
      homePlanet: 'Corellia',
      race: 'Human'
    });

    const res = await request(app).get(`/api/v1/starwars/${character.id}`);

    expect(res.body).toEqual(character);
  });

  it('updates a character by id via PUt', async () => {
    const character = await StarWars.insert({
      character: 'Han Solo',
      weapon: 'DL-44 Heavy Blaster Pistol',
      forceUser: true, // incorrect fact
      homePlanet: 'Corellia',
      race: 'Human'
    });

    const res = await request(app)
      .put(`/api/v1/starwars/${character.id}`)
      .send({ forceUser: false });

    expect(res.body).toEqual({
      ...character,
      forceUser: false
    });
  });
});
