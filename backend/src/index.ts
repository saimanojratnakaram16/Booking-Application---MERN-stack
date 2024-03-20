import express, {Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";

import path from "path";
import userRoutes from "./routes/users"
import authRoutes from './routes/auth';
import myHotelRoutes from './routes/my-hotels';
import hotelRoutes from './routes/hotels';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

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

app.use(express.static(path.join(__dirname,"../../frontend/dist")));

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/my-hotels',myHotelRoutes)
app.use('api/search', hotelRoutes)

app.get("*",(req:Request, res:Response) => {
    res.sendFile(path.join(__dirname,"../../frontend/dist/index.html"));
})

app.listen(8080,() => {
    console.log('listening on port 8080');
});