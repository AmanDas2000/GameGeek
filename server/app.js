const express = require('express')
const app = express()
const mongoose=require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI}=require('./client/config/keys')



mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log("Connected to mongoDB successfully")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/user')
require('./models/rate')
require('./models/game')
require('./models/list')
require('./models/award')
require('./models/admin')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/rate'))
app.use(require('./routes/game'))
app.use(require('./routes/list'))
app.use(require('./routes/award'))

if (process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'))
    })
}


app.listen(PORT, () => {
    console.log("server is running on ",PORT)
})