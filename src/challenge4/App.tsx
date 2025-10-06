import "./App.css";
import Header from "./Header.tsx";
import Entry from "./Entry.tsx";

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Entry />
      </main>
    </>
  );
}
