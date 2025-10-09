export default function Main() {
  return (
    <main>
      <form id="main-form" className="add-ingredient-form">
        <input
          type="text"
          aria-label="Add ingredient"
          placeholder="e.g. oregano"
        ></input>
        <button>Add ingredient</button>
      </form>
    </main>
  );
}
