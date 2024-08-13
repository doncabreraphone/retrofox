import React, { useState, useEffect } from 'react';

const InputField = ({ value, onChange, onKeyDown, inputRef }) => {
  const [isEnterPressed, setIsEnterPressed] = useState(false);

  useEffect(() => {
    let timer;
    if (isEnterPressed) {
      timer = setTimeout(() => setIsEnterPressed(false), 80);
    }
    return () => clearTimeout(timer);
  }, [isEnterPressed]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsEnterPressed(true);
    }
    onKeyDown(event);
  };

  return (
    <div className="w-full rounded-md px-2 lg:px-5 left-3 absolute bottom-14 flex items-center space-x-2">
      <span
        className={`relative px-2 rounded-sm ${
          isEnterPressed ? 'bg-black text-white' : 'bg-green-500 text-black'
        }`}
      >
        root@<span className='hidden lg:inline'>ExpatsTechBsAs</span>
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        maxLength={20}
        className="custom-caret text-white bg-transparent w-full focus:outline-none"
        ref={inputRef}
      />
    </div>
  );
};

export default InputField;
