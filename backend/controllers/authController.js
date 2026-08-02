const { validationResult } = require("express-validator");
const { loginAdmin } = require("../services/authService");

const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const { token } = await loginAdmin(email, password);

    return res.status(200).json({ success: true, token });
  } catch (error) {
    return next(error);
  }
};

module.exports = { login };