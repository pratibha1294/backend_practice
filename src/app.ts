import express, { Request, Response, Application } from 'express';
import { getByeMessage, getHelloMessage } from './util/message.util';

const app: Application = express();


// JSON body parser middleware
app.use(express.json());

// Sample Route with Typed Parameters
app.get('/', (req: Request, res: Response) => {
  res.json({ message: getHelloMessage()});
});

app.get('/bye', (req: Request, res: Response) => {
  res.json({ message: getByeMessage() });
});
export default app