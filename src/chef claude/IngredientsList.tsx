import React, { type Ref } from "react";

const IngredientsList: React.FC<{
  ingredients: string[];
  getRecipe: () => void;
  recipeSection: Ref<HTMLDivElement>;
}> = ({ ingredients, getRecipe, recipeSection }) => {
  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));
  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>
      {ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div ref={recipeSection}>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={getRecipe}>Get a recipe</button>
        </div>
      )}
    </section>
  );
};

export default IngredientsList;
