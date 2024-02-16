import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users"
import authRoutes from './routes/auth';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());

// It enables your Express application to automatically parse JSON data from the request body and make it available in req.body.
app.use(express.json());

//  It allows your Express application to parse data sent in the URL-encoded format
// (e.g., form data) from the request body and makes it available in req.body.
//  The {extended: true} option allows for parsing complex objects and arrays.
app.use(express.urlencoded({extended: true}));


// It enables your server to handle requests from different origins. This is useful when your frontend,
//  hosted on a different domain, needs to make requests to your server.
// The cors middleware adds the necessary HTTP headers to handle cross-origin requests.
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
})); 

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(8080,() => {
    console.log('listening on port 8080');
});