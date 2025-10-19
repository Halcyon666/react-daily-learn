import type { DiceProp } from "./App";

/**
 * Recommendation
 * For scalable apps / larger state management: Option 1 is preferred
 * because it separates state (data) from behavior (actions), which aligns with React best practices.
 */
const Die: React.FC<{ die: DiceProp; changeToHeld: () => void }> = ({
  die,
  changeToHeld,
}) => {
  const { value, isHeld } = die;
  return (
    <button className={isHeld ? "held" : "notHeld"} onClick={changeToHeld}>
      {value}
    </button>
  );
};

export default Die;
