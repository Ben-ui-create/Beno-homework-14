import DbMysql from "../clients/db.mysql.js";

export async function create(person) {
  try {
    const sql = `
        INSERT INTO Persons (FirstName, LastName)
        VALUES (?, ?);
    `;

    const values = [person.FirstName, person.LastName];

    const [result = null] = await DbMysql.query(sql, values);

    return {
      PersonId: result.insertId,
      ...person,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function findAll() {
  try {
    const [result = null] = await DbMysql.query(
      `            SELECT PersonID, FirstName, LastName
                   FROM Persons
                   ORDER BY PersonID;`);

    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function update(id, data) {
  try {
    const sql = `
        UPDATE Persons
        SET FirstName = ?,
            LastName  = ?
        WHERE PersonID = ?
    `;

    const values = [data.FirstName, data.LastName, id];

    const [result = null] = await DbMysql.query(sql, values);

    return result.affectedRows > 0;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function deletePerson(id) {
  try {
    const [[result]] = await DbMysql.query(
      `
          SELECT COUNT(*) AS count
          FROM Orders
          WHERE PersonID = ?
      `,
      [id]
    );

    const count = result.count;

    const [res] = await DbMysql.query(
      `
          DELETE FROM Persons
          WHERE PersonID = ?
      `,
      [id]
    );

    if (res.affectedRows === 0) {
      return null;
    }

    return {
      deleted: true,
      count,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default {
  create,
  findAll,
  update,
  deletePerson,
}