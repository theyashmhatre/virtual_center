const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mysqlConnection = require("../config/dbConnection");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;

module.exports = passport => {

    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            mysqlConnection.query(`SELECT * from user where userId = ${jwt_payload.id}`, function (err, row, fields) {
                const user = row[0];
                console.log(user, jwt_payload);

                if (err) console.log(err);

                else {
                    if (row) {

                        return done(null, user);
                    }
                    return done(null, false);
                }
            })
        })  
        
    );
};