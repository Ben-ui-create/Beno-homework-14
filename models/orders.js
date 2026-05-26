import DbMysql from "../clients/db.mysql.js";

export async function create(order) {
  try {
    const sql = `
    insert into Orders (OrderNumber, PersonID)
    values (?, ?)
    `;

    const values = [order.OrderNumber, order.PersonID];

    const [result = null] = await DbMysql.query(sql, values);

    return {
      OrderId: result.insertId,
      ...order,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function findAll() {
  try {
    const [result = null] = await DbMysql.query(
      `            SELECT o.OrderID,
                          o.OrderNumber,
                          p.FirstName,
                          p.LastName
                   FROM Orders o
                            JOIN Persons p ON o.PersonID = p.PersonID
                   ORDER BY o.OrderID;`);

    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function deleteOrder(id) {
  try {
    const [result = null] = await DbMysql.query(
      `            DELETE
                   FROM Orders
                   WHERE OrderID = ?`, [id]
    );

    return result.affectedRows > 0;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default {
  create,
  findAll,
  deleteOrder,
}