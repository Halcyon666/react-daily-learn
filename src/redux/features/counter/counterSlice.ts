import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  count: number;
}
const initialState: CounterState = {
  count: 0,
};
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state: CounterState) => {
      state.count += 1;
    },
    decrement: (state: CounterState) => {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
