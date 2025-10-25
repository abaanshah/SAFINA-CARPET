import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.js';
import config from './index.js'; // Use our central config
import crypto from 'crypto'; // --- THIS IS THE FIX ---

// We wrap your logic in an exported function
export const configurePassport = (app) => {
  // This "initializes" passport to be used by your app
  app.use(passport.initialize());

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_CALLBACK_URL, // Use the full URL from your .env
      },
      async (accessToken, refreshToken, profile, done) => {
        // This function runs when Google sends a user back
        try {
          // Check if this user already exists in your database
          let user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // If they exist, log them in
            done(null, user);
          } else {
            // If they don't exist, create a new user in your database
            const newUser = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(16).toString('hex'), // Create a random password
              emailVerified: true, // Google already verified their email
            });
            done(null, newUser);
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
};

