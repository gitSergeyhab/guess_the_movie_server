import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from './routers';


const app = express();

const PORT = process.env.PORT || 4000;

const ALLOWED_URLS = ['http://localhost:8080'];
const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

app.use(express.json());


app.use(cors({
    origin: ALLOWED_URLS,
    methods: ALLOWED_METHODS,
    // credentials: true
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

const startServer = () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (err) {
        console.log(' -- Start Server Error: ', {err})
    }
} 

startServer()