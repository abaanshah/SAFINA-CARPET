// import express from "express";
// import passport from "passport";
// import jwt from "jsonwebtoken";

// const router = express.Router();

// // Start Google OAuth login
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// // Google OAuth callback
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: `${process.env.FRONTEND_URL}/login` }),
//   (req, res) => {
//     const user = req.user;

//     // Create JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

//     // Redirect frontend with token & user info
//     const redirectUrl = `${process.env.FRONTEND_URL}/?token=${token}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`;
//     res.redirect(redirectUrl);
//   }
// );

// export default router;
