const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')

const  port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/tareas', require ('./routes/tareasRoutes'))
app.use('/api/users', require ('./routes/usersRoutes'))

app.listen(port, ()=> {
    console.log(`servidor iniciado en el puerto http://localhost:${port}`);
});