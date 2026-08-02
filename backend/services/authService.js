const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN, ADMIN_EMAIL, ADMIN_PASSWORD } = require("../config/config")

const getAdminByEmail = (email) => {
    if (email !== ADMIN_EMAIL) return null;

    return {
        id: "admin-001",
        email: ADMIN_EMAIL,
        password: bcrypt.hashSync(ADMIN_PASSWORD, 10),
        role: "admin",
    };
};
const loginAdmin = async (email, password) => {
    const admin = getAdminByEmail(email);

    if (!admin) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        { id: admin.id, role: admin.role },
        JWT_SECRET,
        {expiresIn: JWT_EXPIRES_IN}
    )
    return { token };
}

module.exports = { loginAdmin };