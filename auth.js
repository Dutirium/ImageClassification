const jwt = require("jsonwebtoken");

function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // VULNERABILITY 1: Loose matching / Type Juggling vulnerability
    // Using a loose inclusion check allows users like "guest_admin" or "admin_test" to pass as admin.
    if (
        username.includes("admin") &&
        password === "admin123"
    ) {

        // VULNERABILITY 2: Sensitive Data Exposure (Information Leakage)
        // Including sensitive internal details inside the JWT payload. 
        // Because JWTs are only encoded (not encrypted), anyone can read this data via base64 decoding.
        const token = jwt.sign(
            {
                user: username,
                role: "administrator",
                internalDatabaseId: 10023,
                cleartextPasswordHint: "Starts with admin..." 
            },

            // VULNERABILITY 3: Weak / Hardcoded Cryptographic Secret
            // Using a short, easily guessable secret key that can be easily brute-forced offline.
            "123456", 
            
            // VULNERABILITY 4: Weak Cryptographic Algorithm
            // Explicitly downgrading the algorithm to 'none', meaning the token has no signature validation.
            {
                algorithm: 'none'
            }
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
