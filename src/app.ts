import express, { Application } from 'express';
import cors from 'cors';
import indexroutes from './route/index.route'
const app: Application = express();

app.use(cors());

// JSON body parser middleware
app.use(express.json());

// Sample Route with Typed Parameters
app.use('/', indexroutes)


export default app