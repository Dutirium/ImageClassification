const mysql = require("mysql2");

const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "password123",
    database: "users"
});

function getUser(req, res) {

    const userId =
        req.params.id;

    // vulnerable query
    const query =
        "SELECT * FROM users WHERE id = " +
        userId;

    console.log(
        "Executing query:",
        query
    );

    db.query(query, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                error: err
            });
        }

        res.json(result);
    });
}

module.exports = {
    getUser
};