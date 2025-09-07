import { registerUser, loginUser } from "../services/user.service.js";

export const register_user = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message); // log real error
    res.status(500).json({ error: error.message }); // send error back
  }
};

export const login_user = async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await loginUser(email, password);

  // Store token in HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true, // cannot be accessed by JS
    secure: process.env.NODE_ENV === "production", // https only in prod
    sameSite: "strict", // CSRF protection
    maxAge:  60 * 1000, // 1 hours
  });

  res.status(200).json({
    message: "login Successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role:user.role
    },
  });
};
