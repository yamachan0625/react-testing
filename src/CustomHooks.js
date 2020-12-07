import React from 'react';
import { useCounter } from './useCounter';

const CustomHooks = () => {
  const { count, increment, decrement, double, triple, reset } = useCounter(3);

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <button onClick={double}>double</button>
      <button onClick={triple}>triple</button>
      <button onClick={reset}>reset</button>
    </div>
  );
};

export default CustomHooks;
