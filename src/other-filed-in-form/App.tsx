import "./index.css";
export default function App() {
  const signUp = (formData: FormData) => {
    // checkbox array data only can get this way.
    const dietary1 = formData.getAll("dietaryRestrictions");
    console.log("dietary1", dietary1);
    // you can merge other data, so as to get allData
    const data = Object.fromEntries(formData);
    const rs = data.dietaryRestrictions;
    console.log(rs == dietary1[0]);

    const allData = {
      ...data,
      dietaryRestrictions: dietary1,
    };

    console.log("allData", allData);
  };

  return (
    <section>
      <h1>Signup form</h1>
      <form action={signUp}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          defaultValue="joe@schmoe.com"
          type="email"
          name="email"
          placeholder="joe@schmoe.com"
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          defaultValue="password123"
          type="password"
          name="password"
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          defaultValue="This is a description"
        ></textarea>

        <fieldset>
          <legend>Employment Status:</legend>
          <label>
            <input type="radio" name="employmentStatus" value="unemployed" />
            Unemployed
          </label>
          <label>
            <input type="radio" name="employmentStatus" value="part-time" />
            Part-time
          </label>
          <label>
            <input
              type="radio"
              name="employmentStatus"
              defaultChecked={true}
              value="full-time"
            />
            Full-time
          </label>
        </fieldset>

        <fieldset>
          <legend>Dietary restrictions:</legend>
          <label>
            <input type="checkbox" name="dietaryRestrictions" value="kosher" />
            Kosher
          </label>
          <label>
            <input type="checkbox" name="dietaryRestrictions" value="vegan" />
            Vegan
          </label>
          <label>
            <input
              type="checkbox"
              name="dietaryRestrictions"
              defaultChecked={true}
              value="gluten-free"
            />
            Gluten-free
          </label>
        </fieldset>

        <label htmlFor="favColor">What is your favorite color?</label>
        <select id="favColor" name="favColor" defaultValue="pink" required>
          <option value="" disabled>
            -- Choose a color --
          </option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="pink">Pink</option>
        </select>

        <button>Submit</button>
      </form>
    </section>
  );
}
