const express = require('express')
const app = express()
const mongoose=require('mongoose')
const PORT = 5000
const {MONGOURI}=require('./keys')



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


app.listen(PORT, () => {
    console.log("server is running on ",PORT)
})