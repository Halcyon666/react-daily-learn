import "./App.css";
import Header from "./Header.tsx";
import Entry from "./Entry.tsx";
import { entryinfos } from "./EntryInfo.ts";

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        {entryinfos.map((entryinfo) => (
          <Entry key={entryinfo.id} {...entryinfo} />
        ))}
      </main>
    </>
  );
}
