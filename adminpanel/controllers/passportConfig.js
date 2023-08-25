const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const initializingPassport = async (passport)=>{
    passport.use(
        new LocalStrategy(async (name, password, done) => {
          let userdata = await user.findOne({ name: name });
          try {
            if (!userdata) return await done(null, false);
            const isPasswordValid = await bcrypt.compare(password, userdata.password);

        if (!isPasswordValid) {
          return done(null, false, { message: "Incorrect password." });
        }

            return await done(null, userdata);
          } catch (error) {
            return await done(error, false);
          }
        })
      );
    
      passport.serializeUser(async (user, done) => {
        done(null, user.id);
      });
    
      passport.deserializeUser(async (id, done) => {
        let data = await user.findById(id);
        done(null, data);
      });
}

module.exports = initializingPassport;
