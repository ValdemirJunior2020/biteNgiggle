// server/src/routes/recipes.js
import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js"; // Correctly import verifyToken

const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await RecipesModel.find({});
    res.status(200).json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching recipes" });
  }
});

// Save a recipe for a user
router.put("/saveRecipe", verifyToken, async (req, res) => {
  const recipeID = req.body.recipeID;
  const userID = req.body.userID;

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const recipe = await RecipesModel.findById(recipeID);
    const user = await UserModel.findById(userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(200).json({ message: "Recipe saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving recipe" });
  }
});

export { router as recipesRouter };
