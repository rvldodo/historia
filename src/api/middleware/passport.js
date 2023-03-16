const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const PassportController = require("../controller/passportController");
const UserService = require("../service/userService");

// passport.use(
// 	"login",
// 	new LocalStrategy(
// 		{ usernameField: "email", passReqToCallback: true },
// 		PassportController.loginUser
// 	)
// );

// passport.use(
// 	new JWTStrategy(
// 		{
// 			secretOrKey: process.env.ACCESS_TOKEN_SECRET,
// 			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
// 		},
// 		PassportController.tokenUser
// 	)
// );

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
		},
		PassportController.register
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await UserService.finUserById(id);

	done(null, user);
});
