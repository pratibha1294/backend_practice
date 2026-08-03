# Backend conventions

## Database migrations

All db-migrate migrations must contain raw SQL, not JS `createTable`/`dropTable` calls.

Write `exports.up` / `exports.down` using `db.runSql(...)` with the DDL as a template literal, e.g.:

```js
exports.up = function (db) {
    return db.runSql(`
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100)
        );
    `);
};

exports.down = function (db) {
    return db.runSql(`
        DROP TABLE users;
    `);
};
```

Do not use `db.createTable(...)` or other JS schema-builder methods.
