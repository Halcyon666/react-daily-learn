import "./App.css";
import ReactLogo from "../assets/react.svg";

export default function Navbar() {
  return (
    <header>
      <nav>
        <img src={ReactLogo} alt="Reawct logo" />
        <span>ReactFact</span>
      </nav>
    </header>
  );
}
