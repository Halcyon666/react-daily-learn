import GlobalPng from "./globe.png";

export default function Header() {
  return (
    <header>
      <img src={GlobalPng} alt="global logo" />
      <h1>My travel journal</h1>
    </header>
  );
}
