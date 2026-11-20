import { pool } from './db';
import express, { Request, Response, NextFunction } from 'express';
import studentRoutes from './routes/studentRoutes';

const app = express();
const PORT = 4000;

// Shared logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Parse JSON request bodies
app.use(express.json());

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Student Information API',
    course: 'ITE 303'
  });
});

// Student routes
app.use('/students', studentRoutes);

// 404 fallback
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

pool.query('SELECT NOW()')
  .then(() => console.log('Database connected successfully'))
  .catch((error: unknown) => console.error('Database connection failed:', error));
  
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
