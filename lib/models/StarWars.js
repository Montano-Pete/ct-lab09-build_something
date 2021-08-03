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
    );

    return new StarWars(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM starwars'
    );

    return rows.map((row) => new StarWars(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM starwars WHERE id =$1', [id]
    );

    return new StarWars(rows[0]);
  }

  static async updateById(id, { character, weapon, forceUser, homePlanet, race }) {
    const currentCharacters = await StarWars.getById(id);
    const newCharacter = character ?? currentCharacters.character;
    const newWeapon = weapon ?? currentCharacters.weapon;
    const newForceUser = forceUser ?? currentCharacters.forceUser;
    const newHomePlanet = homePlanet ?? currentCharacters.homePlanet;
    const newRace = race ?? currentCharacters.race;

    const { rows } = await pool.query(
      'UPDATE starwars SET character=$1, weapon=$2, force_user=$3, home_planet=$4, race=$5 WHERE id=$6 RETURNING *',
      [newCharacter, newWeapon,newForceUser, newHomePlanet, newRace, id]
    );

    return new StarWars(rows[0]);
  }
}