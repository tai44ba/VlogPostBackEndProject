import express from "express";
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { connectToDB } from "./utils/db.js";
import usersRouter from "./routers/users.router.js";
import postsRouter from "./routers/posts.router.js";

const app = express()
const port = process.env.PORT || 5000

dotenv.config()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cookieParser())

// routers

app.use('/users',usersRouter)
app.use('/posts',postsRouter)


// error handlers

app.use((req,res,next) => {
    const err = new Error('Route is not defined')
    err.status = 404
    next(err)
})

app.use((err,req,res,next) => {
    if (err) {
        res.status(err.status||500).json({msg:err.message})
    }
})

// connect to database
connectToDB()

// declaring the port
app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))