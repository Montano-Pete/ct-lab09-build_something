import pool from '../utils/pool';

export default class StarWars {
  id;
  character;
  weapon;
  forceUser;
  homePlanet;
  race;

  constructor(row) {
    this.id = row.id;
    this.character = row.character;
    this.weapon = row.weapon;
    this.forceUser = row.force_user;
    this.homePlanet = row.home_planet;
    this.race = row.race;
  }

  static async insert({ character, weapon, forceUser, homePlanet, race }) {
    const { rows } = await pool.query(
      'INSERT INTO starwars (character, weapon, force_user, home_planet, race) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [character, weapon, forceUser, homePlanet, race]
    )

    return new StarWars(rows[0]);
  }
}