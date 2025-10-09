import { useState } from "react";

export default function Main() {
  // Array destructuring
  const [ingredients, setIngredients] = useState<string[]>([
    "Chicken",
    "Oregano",
    "Tomatoes",
  ]);
  //   const ingredients = ["Chicken", "Oregano", "Tomatoes"];
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // the key is the name of input
    const newIngredient = formData.get("ingredient");
    if (typeof newIngredient === "string" && newIngredient?.trim() !== "") {
      // ============================
      // tips this changes will not re-render by react.
      // page render a new url. so prevent it
      // ingredients.push(newIngredient.trim());
      setIngredients((prev) => [...prev, newIngredient]);
    } else {
      console.warn("No ingredient provided");
    }

    console.log(ingredients);
  };

  return (
    <main>
      <form className="add-ingredient-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="ingredient"
          aria-label="Add ingredient"
          placeholder="e.g. oregano"
        ></input>
        <button>Add ingredient</button>
      </form>
      <h1>Ingrredients on hand:</h1>
      <ul className="ingredient-ul">
        {ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    </main>
  );
}
