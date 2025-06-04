import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/user_routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();
const app = express();

// for __dirname with ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Swagger/OpenAPI Configuration ---
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Specify OpenAPI version
    info: {
      title: 'Agritech API',
      version: '1.0.0',
      description: 'API documentation for the Agritech project',
      contact: {
        name: 'Your Name', // Optional
        email: 'your.email@example.com', // Optional
      },
    },
    servers: [
      {
        url: `http://localhost:6000/api`, // Local server URL
        description: 'Local development server',
      },
      {
        url: 'https://agritrust.onrender.com', // Render deployed server URL (YOUR ACTUAL RENDER URL)
        description: 'Render deployed server',
      },
    ],
    // Optional: Define components (schemas, security schemes) here
    components: {
      schemas: {
        User: { // This defines your User model schema for Swagger
          type: 'object',
          required: ['name', 'mobile', 'gender', 'ghanaCardImage'],
          properties: {
            _id: { type: 'string', description: 'MongoDB ObjectId' },
            name: { type: 'string', description: 'Name of the user' },
            mobile: { type: 'string', description: 'Mobile number of the user' },
            gender: { type: 'string', enum: ['Male', 'Female'], description: 'Gender of the user' },
            email: { type: 'string', format: 'email', description: 'Email address of the user (optional)' },
            ghanaCardImage: { type: 'string', description: 'Path to the Ghana Card image' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        // Define other schemas as needed for requests/responses
      },
      // You can define security schemes here if you implement authentication
      // securitySchemes: {
      //   bearerAuth: {
      //     type: 'http',
      //     scheme: 'bearer',
      //     bearerFormat: 'JWT',
      //   },
      // },
    },
  },
  apis: ['./routes/*.js'], // Path to your API routes files (e.g., user_routes.js)
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// -------------------------------------------------------------


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use('/api/users', router);

app.get('/', (req, res) => {
  res.send('API is running...');
});


const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
