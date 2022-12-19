import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoute from './routes/posts.js';
import userRoute from './routes/user.js';
import dotevn from 'dotenv'

const app = express();
dotevn.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/posts', postRoute);
app.use('/user',userRoute)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true , useUnifiedTopology: true})
.then(()=>{console.log(`Server Running on port: ${PORT}`)})
.catch((err)=>console.log(err.message));

app.listen(PORT);