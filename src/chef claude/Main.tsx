import { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";

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

  const [recipteShown, setRecipeShown] = useState(false);
  const getRecipe = () => setRecipeShown((prev) => !prev);

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
      {recipteShown && <ClaudeRecipe />}
    </main>
  );
}
