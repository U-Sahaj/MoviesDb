import express, { Application, Request, Response } from 'express';
import MovieRecommendationRouter from './Routes';

// Define the Express app
const app: Application = express();

app.use(MovieRecommendationRouter)

// Define a route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
