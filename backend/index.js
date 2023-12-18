const express  = require('express');
const productRoute = require('./route/productRoute');
const cors  = require('cors');
const {notFound,errorHandler} = require('./middleware/errorMiddleware');
const db = require('./config/db');
const path = require('path')


const app = express();

//env variable
const dotenv = require('dotenv');
dotenv.config()
const PORT = process.env.PORT;

//db connection
db()

// for static folder
app.use('/images', express.static(path.join(__dirname, 'public/images')));

//cors | json|url
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true
    }
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//routes
app.use('/api/product',productRoute);

//middlewares
app.use(notFound);
app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`you are applcation running on the port number ${PORT}`)
})