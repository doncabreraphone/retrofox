import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './App';
import "./App.css";

const TerminalComponent = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [prompt, setPrompt] = useState('user@localhost:~$');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistory(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory(1);
    }
  };

  const navigateHistory = (direction) => {
    if (direction === -1 && historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setInput(commandHistory[historyIndex - 1]);
    } else if (direction === 1 && historyIndex < commandHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setInput(commandHistory[historyIndex + 1]);
    } else if (direction === 1 && historyIndex === commandHistory.length - 1) {
      setHistoryIndex(commandHistory.length);
      setInput('');
    }
  };

  const handleCommand = (command) => {
    const newHistory = [...history, `${prompt} ${command}`];
    const newCommandHistory = [...commandHistory, command];
    setCommandHistory(newCommandHistory);
    setHistoryIndex(newCommandHistory.length);

    if (command === 'ssh root@expats') {
      newHistory.push('Trying root@expats...');
      setPrompt('');
      setTimeout(() => {
        newHistory.push('Connected to root@expats');
        setHistory([...newHistory]);

        setTimeout(() => {
          newHistory.push('Login in...');
          setHistory([...newHistory]);

          setTimeout(() => {
            navigate('/expats');
            setAuthenticated(true);
          }, 200);
        }, 100);
      }, 500);
    } else {
      newHistory.push(`ssh: Could not resolve hostname ${command}: Name or service not known`);
    }
    setHistory(newHistory);
    setInput('');
  };

  return (
    <div
      ref={terminalRef}
      className="h-screen w-full bg-gray-900 text-gray-300 font-mono p-4 overflow-y-auto whitespace-pre-wrap text-base"
      onClick={handleClick}
    >
      {history.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      <div className="flex">
        <span className="text-green-400 mr-1">{prompt}</span>
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent border-none outline-none text-gray-300 w-full"
          value={input}
          onChange={(e) => setInput(e.target.value.toLowerCase())}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </div>
  );
};

export default TerminalComponent;
