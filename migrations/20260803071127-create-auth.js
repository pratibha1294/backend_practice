exports.up = function (db) {
    return db.runSql(`
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );
    `);
};

exports.down = function (db) {
    return db.runSql(`
        DROP TABLE users;
    `);
};
