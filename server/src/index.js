import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";  // Import path to serve static files
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// API routes
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

// Serve static files from the React frontend app
app.use(express.static(path.join(path.resolve(), '../client/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(), '../client/build', 'index.html'));
});

// Handle the Mongoose strictQuery deprecation warning
mongoose.set('strictQuery', true);

// MongoDB connection
mongoose.connect(
  "mongodb+srv://infojr83:joaquim2022@cluster0.zr9mi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
