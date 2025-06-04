import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user_routes.js'; 
import authRoutes from './routes/auth_routes.js'; 
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// --- Swagger/OpenAPI Imports ---
import swaggerUi from 'swagger-ui-express';
import fs from 'fs'; // To read file
import yaml from 'js-yaml'; // To parse YAML (make sure you've run 'npm install js-yaml')
// -----------------------------

dotenv.config();
const app = express();

// for __dirname with ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json()); // This is important for parsing JSON request bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Swagger/OpenAPI Configuration ---
let swaggerSpec;
try {
  const swaggerYamlFile = fs.readFileSync(path.resolve(__dirname, 'swagger.yaml'), 'utf8');
  swaggerSpec = yaml.load(swaggerYamlFile);
} catch (e) {
  console.error('Error loading swagger.yaml:', e);
  swaggerSpec = {}; // Fallback to empty spec if there's an error
}

// Serve Swagger UI using the loaded spec
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// -------------------------------------------------------------

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Mount your routes
app.use('/api/users', userRoutes); // User management routes
app.use('/api/auth', authRoutes); // <-- NEW: Mount auth routes

app.get('/', (req, res) => {
  res.send('API is running...');
});


const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));