import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'; // Asegúrate de que estas rutas existan
import contactRoutes from './routes/contactRoutes.js'; // Asegúrate de que estas rutas existan

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
