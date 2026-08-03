const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const requireAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized"});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(403).json({ success: false, message: "Forbidden"});
        }

        req.admin = decoded;
        return next();
    }catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token"});
    }
};

module.exports = { requireAdmin };