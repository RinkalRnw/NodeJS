const LocalStrategy = require('passport-local').Strategy
const User = require('../models/userModel')
const checkPassportLogin = async (passport)=>{
    let user = await User.findOne({ name: username })
    passport.use(new LocalStrategy((username, password, done) => {
        // Replace this with your actual user lookup logic
        
         async (err, user) => {
            if (err) return await done(err);
            if (!user) return await done(null, false, { message: 'Incorrect username.' });
            if (!user.validPassword(password)) return await done(null, false, { message: 'Incorrect password.' });
            return done(null, user);
        };
    }));
    
    // Serialize and deserialize user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

}

module.exports = checkPassportLogin