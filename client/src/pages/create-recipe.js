import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="create-recipe">
        <h2>Create Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={recipe.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={recipe.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="ingredients" className="form-label">Ingredients</label>
            {recipe.ingredients.map((ingredient, index) => (
              <input
                key={index}
                type="text"
                name="ingredients"
                className="form-control mb-2"
                value={ingredient}
                onChange={(event) => handleIngredientChange(event, index)}
              />
            ))}
            <button type="button" className="btn btn-secondary mt-2" onClick={handleAddIngredient}>
              Add Ingredient
            </button>
          </div>
          <div className="mb-3">
            <label htmlFor="instructions" className="form-label">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              className="form-control"
              value={recipe.instructions}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              className="form-control"
              value={recipe.imageUrl}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cookingTime" className="form-label">Cooking Time (minutes)</label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              className="form-control"
              value={recipe.cookingTime}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Create Recipe</button>
        </form>
      </div>
    </div>
  );
};
