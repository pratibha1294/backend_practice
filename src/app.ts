import express, { Request, Response, Application } from 'express';
import { getByeMessage, getHelloMessage } from './util/message.util';

const app: Application = express();


// JSON body parser middleware
app.use(express.json());

// Sample Route with Typed Parameters
app.get('/', (req: Request, res: Response) => {
    const {name} = req.query
    if(name?.toString().trim()===''){
        res.status(400).json({message: 'Name cannot be empty string'})
        return;
    }
    

  res.json({ message: getHelloMessage(name)});
});

app.get('/bye', (req: Request, res: Response) => {
    const {name} = req.query
  res.json({ message: getByeMessage(name) });
});
export default app