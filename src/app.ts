import express, { Application } from 'express';
import indexroutes from './route/index.route'
const app: Application = express();


// JSON body parser middleware
app.use(express.json());

// Sample Route with Typed Parameters
app.use('/', indexroutes)


export default app