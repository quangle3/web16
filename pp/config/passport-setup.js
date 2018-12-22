const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const UserModel = require('../models/user');

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser((id,done) => {
    UserModel.findById(id).then((user) => {
        done(null,user);
    });
});

passport.use(
    new googleStrategy({
        callbackURL: '/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done)=> {
        //callback function
        console.log(profile);
        console.log("Token: "+accessToken);
        UserModel.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser) {
                console.log("user is: " + currentUser);
                done(null,currentUser);
            } else {
                new UserModel({
                    username: profile.name.givenName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log("new user: "+newUser);        
                    done(null,newUser);    
                })
            }
        });
    })
)