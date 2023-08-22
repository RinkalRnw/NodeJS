const LocalStrategy = require('passport-local').Strategy
const userModel = require('../models/userModel')

const initializingPassport = (passport)=>{
    try{
        passport.use(new LocalStrategy( async (username,password,done)=>{
            const user = await userModel.findOne({name:username})

            if(!user) return done(null,false)

            if(user.password !== password) return done(null,false)
            return done(null,user)

        }))

    } catch(err){
        return done(err,false)

    }
    
    passport.serializeUser((user,done)=>{
        done(null,user)
    })

    passport.deserializeUser(async(id,done)=>{
        try{
            const user = await userModel.findById(id)
            done(null,user)
        }  catch(err){
            return done(err,false)
    
        }
    })

}

module.exports = initializingPassport