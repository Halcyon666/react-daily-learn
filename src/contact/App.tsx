import "./index.css";
import Contact from "./Contact";
import { contacts } from "./ContactInfo";

function App() {
  return (
    <div className="contacts">
      {contacts.map((contact) => (
        <Contact key={contact.id} {...contact} />
      ))}
    </div>
  );
}

export default App;
