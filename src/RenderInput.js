import React from 'react';

const RenderInput = ({ outputConsole }) => {
  const [input, setInput] = React.useState('');

  const outputValue = () => {
    if (input) {
      outputConsole(input);
    }
  };

  const updateValue = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter"
        value={input}
        onChange={updateValue}
      />
      <button onClick={outputValue}>console</button>
    </div>
  );
};

export default RenderInput;
