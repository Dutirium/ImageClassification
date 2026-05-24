const jwt = require("jsonwebtoken");

function login(req, res) {

    const username = req.body.username;
    const password = req.body.password;

    // insecure hardcoded credentials
    if (
        username === "admin" &&
        password === "admin123"
    ) {

        const token = jwt.sign(

            {
                user: username
            },

            "super_secret_key"
        );

        console.log(
            "Generated token:",
            token
        );

        return res.json({
            success: true,
            token
        });
    }

    res.status(401).json({
        success: false
    });
}

module.exports = {
    login
};
