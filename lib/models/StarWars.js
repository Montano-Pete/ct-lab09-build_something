import pool from '../utils/pool';

export default class StarWars {
  id;
  character;
  weapon;
  forceUser;
  homePlanet;

  constructor(row) {
    this.id = row.id;
    this.character = row.character;
    this.weapon = row.weapon;
    this.forceUser = row.force_user;
    this.homePlanet = row.home_planet;
  }

  static async insert({ character, weapon, forceUser, homePlanet }) {
    const { rows } = await pool.query(
      'INSERT INTO starwars (character, weapon, force_user, home_planet) VALUES ($1, $2, $3, $4) RETURNING *',
      [character, weapon, forceUser, homePlanet]
    )

    return new StarWars(rows[0]);
  }
}