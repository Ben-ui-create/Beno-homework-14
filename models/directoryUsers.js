import DbMysql from '../clients/db.mysql.js';

export async function create(user) {
  try {
    const sql = `
            INSERT INTO directory_users (name)
            VALUES (?)
        `;

    const [result] = await DbMysql.query(sql, [user.name]);

    return {
      id: result.insertId,
      name: user.name,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function findAll() {
  try {
    const sql = `
            SELECT id, name
            FROM directory_users
            ORDER BY id
        `;

    const [rows] = await DbMysql.query(sql);

    return rows;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default {
  create,
  findAll,
};