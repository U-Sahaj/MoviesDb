import express, { Application, Request, Response } from 'express';
import MovieRecommendationRouter from './Routes';
import mongoose from 'mongoose';

// Define the Express app
const app: Application = express();

app.use(MovieRecommendationRouter)

// Define a route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// Connect to MongoDB
mongoose.connect('mongodb://test-mongo:27017/TestDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));
  
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
