import reactLogo from "../assets/react.svg";
// 不要忘记导入 不然css没有效果
import "./index.css";

export default function Header() {
  return (
    <>
      <header className="header">
        <img src={reactLogo} width="40px" alt="React Logo" />
        <nav>
          <ul className="nav-list">
            <li className="nav-list-item">Pricing</li>
            <li className="nav-list-item">About</li>
            <li className="nav-list-item">Contact</li>
          </ul>
        </nav>
      </header>
    </>
  );
}
