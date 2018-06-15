const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const KakaoStrategy = require("passport-kakao").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = (app, passport) => {
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    session({
      secret: keys.secret,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    })
  );

  passport.serializeUser((user, done) => {
    if (user.active) {
      token = jwt.sign(
        {
          username: user.username,
          email: user.email
        },
        keys.secret,
        {
          expiresIn: "24h"
        }
      );
    }
    // The else part is not considered as an error in Passportjs. So add error msg to token
    // ex) for facebook, it will redirect to '/facebook/inactive/error'
    else {
      token = "inactive/error";
    }

    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

  passport.use(
    new KakaoStrategy(
      {
        clientID: "33bdb5c8abf403a5a232ef10aa74c722",
        callbackURL: "/auth/kakao/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        var _profile = profile._json;
        User.findOne({ email: `${_profile.id}@fctotal.com` })
          .select(
            "username active passport email name profile_image thumbnail_image"
          )
          .exec((err, user) => {
            if (err) done(err);

            // empty or undefined user
            if (user && user != null) {
              console.log(user);
              done(null, user);
            } else {
              if (_profile && _profile.properties) {
                const newUser = new User({
                  name: _profile.properties.nickname,
                  username: _profile.id,
                  email: `${_profile.id}@fctotal.com`,
                  profile_image: _profile.properties.profile_image,
                  thumbnail_image: _profile.properties.thumbnail_image,
                  password: keys.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                      .save()
                      .then(user => done(null, user))
                      .catch(rr => done(err));
                  });
                });
              }
              done(null, false);
            }
          });
      }
    )
  );

  // kakao 로그인
  app.get("/auth/kakao", passport.authenticate("kakao"));
  // kakao 로그인 연동 콜백
  app.get(
    "/auth/kakao/callback",
    passport.authenticate("kakao", {
      failureRedirect: "http://localhost:3000/login"
    }),
    (req, res) => {
      res.redirect(`http://localhost:3000/kakao/${token}`);
    }
  );
  return passport;
};
