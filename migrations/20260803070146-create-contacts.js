exports.up = function (db) {
    return db.runSql(`
        CREATE TABLE contacts (
            contact_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            primary_number VARCHAR(50) NOT NULL
        );
    `);
};

exports.down = function (db) {
    return db.runSql(`
        DROP TABLE contacts;
    `);
};
