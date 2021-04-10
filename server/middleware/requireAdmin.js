const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../client/config/keys')
const mongoose = require('mongoose')
const Admin = mongoose.model("Admin")


module.exports = (req, res, next) => {
    const {authorization} = req.headers
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"you must be logged in"})
        }

        const {_id} = payload
        Admin.findById(_id,(error,adminData)=>{
            if(error) console.log(error)
            else
            {
                if(adminData==null)
                res.json("Only Admin Acess")
                else
                req.user=adminData
                next()
            }
        })
        
    })
}