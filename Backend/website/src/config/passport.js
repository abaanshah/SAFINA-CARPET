// // src/config/passport.js

// // Import necessary modules
// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import User from "../models/user.js"; // Your Mongoose user model

// // Configure the Google authentication strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `${process.env.BACKEND_URL}/api/oauth/google/callback`,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Check if the user already exists in the database using their Google ID
//         let user = await User.findOne({ googleId: profile.id });

//         // If the user doesn't exist, create a new one
//         if (!user) {
//           user = await User.create({
//             googleId: profile.id,
//             name: profile.displayName,
//             email: profile.emails[0].value,
//           });
//         }
//         // Pass the user object to the next middleware (serialization)
//         done(null, user);
//       } catch (err) {
//         // Handle any errors that occur during the process
//         done(err, null);
//       }
//     }
//   )
// );

// // Serialize user: Store the user's ID in the session
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // Deserialize user: Retrieve the user object from the database using the ID
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });
