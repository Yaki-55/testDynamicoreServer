import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// Configurar dotenv
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configurar CORS
const corsOptions = {
  //origin: ['http://localhost:5174', 'https://test-dynamicore-client.vercel.app'], // Permitir solicitudes desde estos orígenes
  origin: ['*'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Permitir el uso de cookies y otros headers de autenticación
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware para registrar solicitudes
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 segundos de tiempo de espera para la selección del servidor
  socketTimeoutMS: 45000 // 45 segundos de tiempo de espera para las operaciones
}).then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas', err));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);

// Manejo de errores
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
