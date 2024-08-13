/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import toml from "toml";
import InputField from "./InputField";
import ContentRenderer from "./ContentRenderer";


const BASE_PATH = '/expats';

const fetchTomlData = async (file) => {
    try {
        const response = await fetch(`${BASE_PATH}/pages/${file}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();
        const parsed = toml.parse(text);
        
        // Update paths in the parsed TOML data
        if (parsed.cover) {
            parsed.cover = `${BASE_PATH}/${parsed.cover.replace(/^\.\//, '')}`;
        }
        
        return parsed;
    } catch (error) {
        console.error("Error fetching TOML:", error);
        return null;
    }
};
  

  

const App = () => {
  const [data, setData] = useState(null);
  const [command, setCommand] = useState("");
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  const [cover, setCover] = useState(null);
  const [coverStyle, setCoverStyle] = useState('');
  const [content, setContent] = useState('');
  const [contentStyle, setContentStyle] = useState({});
  const [activeClass, setActiveClass] = useState('');
  



useEffect(() => {
    if (data) {
      const screenElement = document.getElementById("screenthis");
  
      if (screenElement) {
        // Eliminar todas las clases de estilo actuales excepto la base
        const baseClass = 'content';
        screenElement.className = baseClass;
  
        // Añadir la nueva clase de estilo
        if (data.style) {
          screenElement.classList.add(data.style);
        }
  
        // Aplicar estilos de contenido
        if (data.styles) {
          Object.keys(data.styles).forEach((key) => {
            screenElement.style[key] = data.styles[key];
          });
        }
      }
  
      // Manejo de la imagen de portada
      const coverImage = document.getElementById("cover");
      if (coverImage) {
        coverImage.className = `mb-4 mx-auto max-h-96 lg:max-h-[440px] xl:max-h-[500px] 2xl:max-h-[580px] larger xl:pt-2 ${data.coverStyle || ''}`;
      }
    }
  }, [data]);
  









  // Fetch initial data
  useEffect(() => {
    fetchTomlData("welcome.toml").then(setData);
  }, []);

  // Input focus handlers
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    const handleMouseOver = () => {
      if (inputRef.current) inputRef.current.focus();
    };

    const handleClick = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        inputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("click", handleClick);
    };
  }, [data]);

  const handleInputChange = useCallback(
    (event) => setCommand(event.target.value),
    []
  );

  useEffect(() => {
    console.log("si se ejecuta");
    const timer = setTimeout(() => {
      if (wrapperRef.current) {
        wrapperRef.current.classList.add("hidden");
        console.log(wrapperRef);
      }
    }, 4000); // 10 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
  }, [data]);

  const handleLoadClick = useCallback(async () => {
    if (data && data.links) {
      // Reset state for the current TOML data
      setCover(null);
      setCoverStyle('');
      setContent('');
      setContentStyle({});
      setActiveClass('');
    
      const normalizedCommand = command.trim().toLowerCase();
  
      let file =
        data.links[normalizedCommand] ||
        data.links[normalizedCommand.toUpperCase()] ||
        data.links[normalizedCommand.toLowerCase()] ||
        data.links[command.trim()];
  
      if (!file) {
        const match = Object.entries(data.links).find(
          ([key, value]) =>
            key.toLowerCase() === normalizedCommand ||
            key[0].toLowerCase() === normalizedCommand ||
            value.toLowerCase() === normalizedCommand ||
            key === command.trim()
        );
        if (match) file = data.links[match[0]];
      }
  
      if (file) {
        if (file.startsWith('https://')) {
            // Open the link in a new tab if it's a URL
            window.open(file, '_blank');
            setCommand(""); // Clear the command
            return; // Exit the function
        }
  
        // Fetch new data
        const newData = await fetchTomlData(file);
        setData(newData);
        setCommand("");
  
        // Re-add elements using state
        if (newData.cover) {
          setCover(newData.cover);
          setCoverStyle(newData.coverStyle || '');
        }
  
        // Apply styles and content using state
        setContent(newData.content.text);
        setContentStyle(newData.styles || {});
  
        // Show and hide wrapper
        if (wrapperRef.current) {
          wrapperRef.current.classList.add("hidden");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              wrapperRef.current.classList.remove("hidden");
            });
          });
        }
      } else {
        setCommand("");
      }
    }
  }, [data, command]);
  
  

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleLoadClick();
      }
    },
    [handleLoadClick]
  );

  useEffect(() => {
    const screenElement = document.getElementById("screenthis");
    if (data && data.style && screenElement) {
      screenElement.classList.add(data.style);
    }

    if (data && data.coverStyle) {
        const coverImage = document.querySelector('img');
        if (coverImage) {
          coverImage.classList.add(data.coverStyle);
        }
      }
  }, [data]);



  //   HOW MUCH TIME HAS THE USER BEEN "CONNECTED"?
  //
  useEffect(() => {
  let startTime = Date.now();
  setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
    const seconds = String(elapsed % 60).padStart(2, "0");
    document.getElementById(
      "timer"
    ).textContent = `ONLINE ${hours}:${minutes}:${seconds}`;
  }, 1000);
}, []);

  if (!data)
    return <div className="fullscreen-message">SESSION ESTABLISHED...</div>;

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-lg leading-5 lg:text-xl lg:leading-5">
      <div
        className="relative mx-0 lg:max-w-screen-xl lg:rounded-lg lg:shadow-lg lg:border lg:border-gray-900 lg:min-w-[1300px] mx-1 lg:mx-0 pt-4 lg:pt-0"
        id="screen"
      >
        <div className="shrink-wrapper" ref={wrapperRef}>
          <div className="shrink-div"></div>
          <div className="shrink-bottom"></div>
        </div>
        <div className="scanlines"></div>
        <div className="relative z-10 px-5">
          {data.cover ? (
            <img
                id="cover"
                src={data.cover}
                alt="Cover"
                className={`mb-4 mx-auto max-h-96 2xl:max-h-full xl:pt-2 ${data.coverStyle || ''}`}
            />
            ) : null}
          <div id="screenthis" className="content lg:absolute">
            <ContentRenderer content={data.content.text} styles={data.styles} />
          </div>
        </div>
        <InputField
          value={command}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
        />
        <div className="bg-[#0015ff] text-yellow-200 text-lg bottom-0 absolute mt-20 w-full flex justify-around items-center border-t-2 border-yellow-300">
          <div className="border-r-4 border-yellow-300 px-5">CONNECTED</div>
          <div className="border-r-4 border-yellow-300 px-5 hidden lg:block">TELNET</div>
          <div className="border-r-4 border-yellow-300 px-5 hidden lg:block">AUTO</div>
          <div className="border-r-4 border-yellow-300 px-5 hidden lg:block">4.2MBPS</div>
          <div id="timer">ONLINE 00:04:19</div>
        </div>
      </div>
    </div>
  );
};

export default App;
