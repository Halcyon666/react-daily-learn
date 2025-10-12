import { useState } from "react";

export default function Main() {
  // Array destructuring
  const [ingredients, setIngredients] = useState<string[]>([]);
  //   const ingredients = ["Chicken", "Oregano", "Tomatoes"];
  /*   const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
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
  }; */

  /*   const addIngredient = (formData: FormData) => {
    const ingredient = getStringField(formData, "ingredient");
    if (!ingredient) return;
    setIngredients((prev) => [...prev, ingredient]);
  };

  const getStringField = (formdata: FormData, key: string): string => {
    const value = formdata.get(key);
    return typeof value === "string" && value.trim() ? value.trim() : "";
  }; */

  const addIngredient = (formData: FormData) => {
    const newIngredient = formData.get("ingredient")?.toString().trim();
    if (!newIngredient) return;
    setIngredients((prev) => [...prev, newIngredient]);
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
      <section className="ingredients">
        <h2>Ingrredients on hand:</h2>
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
