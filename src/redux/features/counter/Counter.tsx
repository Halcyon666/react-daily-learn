import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./counterSlice";
import "../../index.css";

const Counter = () => {
  const count: number = useSelector((state) => state.counter.count);
  const dispathch = useDispatch();
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
