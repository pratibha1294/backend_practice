import express, { Request, Response, Application } from 'express';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// JSON body parser middleware
app.use(express.json());

// Sample Route with Typed Parameters
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express with TypeScript!' });
});

app.get('/bye', (req: Request, res: Response) => {
  res.json({ message: 'Bye! from Express with TypeScript!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
