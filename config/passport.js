const JwtStrategy = require("passport-jwt").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = passport => {
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
        clientID: "e031a2bf8391480b2bcacd962d177b9e",
        callbackURL: "/api/users/login/kakao/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        var _profile = profile._json;
        loginByThirdparty(
          {
            auth_type: "kakao",
            auth_id: _profile.id,
            auth_name: _profile.properties.nickname,
            auth_email: _profile.id
          },
          done
        );
      }
    )
  );
};
