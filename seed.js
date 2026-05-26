import 'dotenv/config';
import DbMysql from './clients/db.mysql.js';

async function seed() {
  try {
    await DbMysql.query('DELETE FROM Customers');

    await DbMysql.query(
      `
            INSERT INTO Customers (CustomerName, City, last_name)
            VALUES
                (?, ?, ?),
                (?, ?, ?),
                (?, ?, ?),
                (?, ?, ?),
                (?, ?, ?),
                (?, ?, ?)
            `,
      [
        'Արամ',    'Երևան',   'Պետրոսյան',
        'Անի',     'Երևան',   'Սահակյան',
        'Լուսինե', 'Երևան',   'Հակոբյան',
        'Գոռ',     'Գյումրի', 'Մարտիրոսյան',
        'Նարե',    'Գյումրի', 'Ավետիսյան',
        'Դավիթ',   'Վանաձոր', 'Կարապետյան',
      ]
    );

    console.log('-> Customers seeded');

    await DbMysql.query('DELETE FROM directory_users');

    await DbMysql.query(
      `
            INSERT INTO directory_users (name)
            VALUES
                (?),
                (?),
                (?)
            `,
      [
        'Արթուր',
        'Անի',
        'Գոռ',
      ]
    );

    console.log('-> directory_users seeded');

    await DbMysql.query('DELETE FROM Persons');

    const [personsResult] = await DbMysql.query(
      `
            INSERT INTO Persons (FirstName, LastName)
            VALUES
                (?, ?),
                (?, ?),
                (?, ?)
            `,
      [
        'Արամ', 'Պետրոսյան',
        'Անի', 'Սահակյան',
        'Գոռ', 'Մկրտչյան',
      ]
    );

    console.log('-> Persons seeded');

    const [persons] = await DbMysql.query(
      `
            SELECT PersonID, FirstName
            FROM Persons
            ORDER BY PersonID
            `
    );

    const aramId = persons.find(p => p.FirstName === 'Արամ')?.PersonID;
    const aniId = persons.find(p => p.FirstName === 'Անի')?.PersonID;
    const gorId = persons.find(p => p.FirstName === 'Գոռ')?.PersonID;

    await DbMysql.query('DELETE FROM Orders');

    await DbMysql.query(
      `
            INSERT INTO Orders (OrderNumber, PersonID)
            VALUES
                (?, ?),
                (?, ?),
                (?, ?),
                (?, ?),
                (?, ?)
            `,
      [
        1001, aramId,
        1002, aramId,
        1003, aniId,
        1004, gorId,
        1005, gorId,
      ]
    );

    console.log('-> Orders seeded');

    console.log('\n Database seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed');
    console.error(error);

    process.exit(1);
  }
}

await seed();