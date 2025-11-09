import "./index.css";
import { decrement, increment, incrementByAmount, reset } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useState } from "react";

const Counter = () => {
  const count: number = useAppSelector((state) => state.counter.count);
  const dispathch = useAppDispatch();

  const [incrementAmount, setIncrementAmount] = useState(0);
  const addValue = Number(incrementAmount) || 0;
  const resetAll = () => {
    setIncrementAmount(0);
    dispathch(reset());
  };
  return (
    <section>
      <p>{count}</p>

      <div>
        <button onClick={() => dispathch(increment())}>+</button>
        <button onClick={() => dispathch(decrement())}>-</button>
      </div>
      <input
        type="text"
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(Number(e.target.value))}
      />
      <button onClick={() => dispathch(incrementByAmount(addValue))}>
        incrementByAmount
      </button>
      <button onClick={resetAll}>resetAll</button>
    </section>
  );
};

export default Counter;
