const express = require('express');
const mongoose = require('mongoose');
const booksRoute = require('./routes/booksRoute.js');
const cors = require('cors');


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/', booksRoute);

app.use('/books', booksRoute);

// Middleware for handling CORS POLICY
app.use(cors());
app.use(
    cors({
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowHeaders: ['Content-Type']
    })
)


mongoose.connect("mongodb+srv://rufik9900:Rufat12345!@nodesitecluster.syvdol1.mongodb.net/books").then(()=>{
    console.log('DB is connected');
    app.listen(3001, () => {
        console.log('App is started')
    })
}).catch((error)=> {
    console.log(error);
})

