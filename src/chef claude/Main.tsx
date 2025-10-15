import { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromChefClaude } from "./ai";

export default function Main() {
  const [ingredients, setIngredients] = useState<string[]>([
    "all the main spices",
    "pasta",
    "ground beef",
    "tomato paste",
  ]);

  const addIngredient = (formData: FormData) => {
    const newIngredient = formData.get("ingredient")?.toString().trim();
    if (!newIngredient) return;
    setIngredients((prev) => [...prev, newIngredient]);
  };

  const [recipeShown, setRecipeShown] = useState(false);
  const [recipeResult, setRecipeResult] = useState<string>("");
  const getRecipe = async () => {
    setRecipeShown((prev) => !prev);
    const recipe = await getRecipeFromChefClaude(ingredients);
    setRecipeResult(recipe);
  };

  return (
    <main>
      <form className="add-ingredient-form" action={addIngredient}>
        <input
          type="text"
          name="ingredient"
          aria-label="Add ingredient"
          placeholder="e.g. oregano"
          defaultValue="🍎"
        ></input>
        <button>Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}
      {recipeShown && <ClaudeRecipe recipe={recipeResult} />}
    </main>
  );
}
