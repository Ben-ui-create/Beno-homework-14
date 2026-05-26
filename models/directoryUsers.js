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

export async function getUnique() {
  try {
    const sql = `
      SELECT CustomerName AS name FROM Customers
      UNION
      SELECT name FROM directory_users
      ORDER BY name
    `;

    const [rows] = await DbMysql.query(sql);

    return rows;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAll() {
  try {
    const sql = `
      SELECT CustomerName AS name FROM Customers
      UNION ALL
      SELECT name FROM directory_users
      ORDER BY name
    `;

    const [rows] = await DbMysql.query(sql);

    return rows;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getByLast() {
  try {
    const sql = `
      SELECT last_name AS name FROM Customers
      UNION
      SELECT name FROM directory_users
      ORDER BY name
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
  getUnique,
  getByLast,
  getAll,
};