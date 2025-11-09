import "../../index.css";
import { decrement, increment } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

const Counter = () => {
  const count: number = useAppSelector((state) => state.counter.count);
  const dispathch = useAppDispatch();
  return (
    <section>
      <p>{count}</p>

      <div>
        <button onClick={() => dispathch(increment())}>+</button>
        <button onClick={() => dispathch(decrement())}>-</button>
      </div>
    </section>
  );
};

export default Counter;
