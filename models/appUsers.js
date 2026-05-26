import DbMysql from '../clients/db.mysql.js';
import _ from 'lodash';
import md5 from 'md5';

const {PASSWORD_SECRET} = process.env;

export async function findById(id) {
  try {
    const [result = null] = (await DbMysql.query(
      `SELECT *
       FROM users
       WHERE id = ?
       limit 1;`,
      [id]
    )) || [];

    return _.head(result) || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function findByEmail(email) {
  try {
    const [result = null] = (await DbMysql.query(
      `SELECT *
       FROM users
       WHERE email = ?
       limit 1;`,
      [email]
    )) || [];

    return _.head(result) || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function checkEmailUnique(email) {
  try {
    const [result = null] = (await DbMysql.query(
      `SELECT *
       FROM users
       WHERE email = ?
       limit 1;`,
      [email]
    )) || [];

    return !_.isEmpty(result);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function create({ name, age, email, password }) {
  try {
    const result = await DbMysql.query(
      `insert into users (name, age, email, password)
       values (?, ?, ?, ?);`,
      [name, age, email, password]
    );

    const id = _.get(result, '0.insertId', null);

    return await findById(id);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function update(id, { name, age }, returnData = false) {
  try {
    const result = await DbMysql.query(
      `
          update users
          set name = ?,
              age  = ?
          WHERE id = ?;
      `,
      [name, age, id]
    );

    const affectedRows = _.get(result, '0.affectedRows', null);

    return returnData
      ? await findById(id)
      : affectedRows > 0;
  } catch (error) {
    console.error(error);
    return null;
  }

}

export function hashPassword(pass) {
  return md5(md5(pass) + PASSWORD_SECRET);
}

export default {
  findById,
  findByEmail,
  checkEmailUnique,
  create,
  update,
  hashPassword,
}