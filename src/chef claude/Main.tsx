import { useEffect, useRef, useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromChefClaudeStream } from "./ai";

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
    setRecipeShown(true);
    setRecipeResult(""); // 清空
    await getRecipeFromChefClaudeStream(ingredients, (chunk) => {
      // 立即追加并触发渲染
      setRecipeResult((prev) => prev + chunk);
    });
  };

  const recipeSection = useRef<HTMLDivElement>(null);
  console.log(recipeSection);
  useEffect(() => {
    recipeSection.current?.scrollIntoView();
  }, [recipeResult]);
  return (
    <main>
      <form className="add-ingredient-form" action={addIngredient}>
        <input
          type="text"
          name="ingredient"
          aria-label="Add ingredient"
          placeholder="e.g. oregano"
          // defaultValue="🍎"
        ></input>
        <button>Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          recipeSection={recipeSection}
        />
      )}
      {recipeShown && !recipeResult ? (
        <div className="loading-placeholder">
          <div className="spinner" />
          <p>Chef Claude is thinking... 🍳</p>
        </div>
      ) : (
        <ClaudeRecipe recipe={recipeResult} />
      )}
    </main>
  );
}
