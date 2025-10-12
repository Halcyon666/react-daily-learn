import chefClaudeIcon from "../assets/chef-claude-icon.png";

const Header = () => {
  return (
    <header>
      <img src={chefClaudeIcon}></img>
      <h1 className="header-text">Chef Claude</h1>
    </header>
  );
};

export default Header;
