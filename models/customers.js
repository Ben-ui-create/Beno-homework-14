import DbMysql from "../clients/db.mysql.js";

export async function create(customer) {
  try {
    const sql = `
        INSERT INTO Customers (CustomerName,
                               City,
                               last_name)
        VALUES (?, ?, ?)
    `;

    const values = [customer.CustomerName, customer.City, customer.last_name];

    const [result = null] = await DbMysql.query(sql, values);

    return {
      CustomerId: result.insertId,
      ...customer,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function findAll() {
  try {
    const [result = null] = await DbMysql.query(
      `            SELECT CustomerID,
                          CustomerName,
                          City,
                          last_name
                   FROM Customers
                   ORDER BY CustomerID;`);

    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function findSameCity() {
  try {
    const [result = null] = await DbMysql.query(
      `            SELECT A.CustomerName AS cm1,
                          B.CustomerName AS cm2,
                          A.City         AS c
                   FROM Customers A,
                        Customers B
                   WHERE A.CustomerID <> B.CustomerID
                     AND A.City = B.City
                   ORDER BY c, cm1, cm2;`);

    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function deleteCustomer(id) {
  try {
    const [result = null] = await DbMysql.query(
      `            DELETE
                   FROM Customers
                   WHERE CustomerID = ?;
`, [id]);

    return result.affectedRows > 0;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default {
  create,
  findAll,
  findSameCity,
  deleteCustomer,
}