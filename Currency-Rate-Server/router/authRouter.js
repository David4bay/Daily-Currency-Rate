const session = require("express-session")
const connectMongoDBSession = require("connect-mongodb-session")
const oauthRoutes = require("express").Router()
const passport = require("passport")
const store = require("../store/store")
const MongoSession = connectMongoDBSession(session)
const GitHubStrategy = require("passport-github2").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy

const sessionStore = MongoSession({
    uri: `mongodb+srv://${store.DBUsername}:${store.DBPassword}@${store.DB_URL}`,
    databaseName: store.DB_NAME,
    collection: store.SESSION_COLLECTION,
    connectionOptions: {
        serverSelectionTimeoutMS: 300000
    },
    // expires: 60 * 60 * 30
})

passport.use(new GoogleStrategy({
    clientID: store.Google_Client_Id,
    clientSecret: store.Google_Client_Secret,
    callbackURL: "http://localhost:3001/auth/google/callback",
}, function(accessToken, refreshToken, profile, done) {
    console.log("accessToken Google", accessToken, "refreshToken Google", refreshToken, "profile Google", profile)
    done(null, profile)
}))

passport.use(new GitHubStrategy({
    clientID: store.GITHUB_CLIENT_ID,
    clientSecret: store.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3001/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("accessToken Google", accessToken, "refreshToken Google", refreshToken, "profile Google", profile)
    done(null, profile)
  }
))

passport.serializeUser(function(user, done) {
    console.log("serialize user", user)
    return done(null, user)
})

passport.deserializeUser(function(user, done) {
    console.log("serialize user", user)
    return done(null, user)
})

oauthRoutes.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            sameSite: false,
            secure: false,
            // maxAge: 1000 * 60 * 30
        }
    })
)

oauthRoutes.use(passport.initialize())
oauthRoutes.use(passport.session())


oauthRoutes.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}))

oauthRoutes.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3001/home",
    failureRedirect: "http://localhost:3001/login",
    session: process.env.NODE_ENV === "development" ? false : true
}), function(request, _) {

    if (request.user) {
        console.log("logged in successfully")
    } else {
        console.log("log in failed.")
        return
    }
})

oauthRoutes.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }));
  
oauthRoutes.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(_, res) {
      
      res.redirect('/home');
})

module.exports = oauthRoutes