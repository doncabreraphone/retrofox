import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



reportWebVitals();

document.addEventListener("DOMContentLoaded", function() {
    const message = `%c
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,@@@,,,,,,,,,,,,,,,,,,,,,,,@@@,,,,,
,,,,@@(((@@@@,,,,,,,,,,,,,,,@@@@***@@,,,
,,,,@@  .@@((/#@,,,,,,,,,@(*//@@.  @@,,,
,,,,@@   ..@@(//@@,,,,,@@*//@@..   @@,,,
,,,,,,@@   ..@%*****///(((&@..   @@,,,,,
,,,,,,@@   @@**////////////(@@   @@,,,,,
,,,,,,@@ @@**///////////////((@@ @@,,,,,
,,,,,,,,@**///////////////////((@,,,,,,,
,,,,,,,,@**//@%///////////&@//((@,,,,,,,
,,,,,,,,@**///////  @  ///////((@,,,,,,,
,,,,,,@@*////               ////(@@,,,,,
,,,,,,,,,,,@@@@@.........@@@@@..,,,,,,,,
,,,,,,,,,,,,,,,,@@@@@@@@@,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

░█▀▄░█▀▀░▀█▀░█▀▄░█▀█░█▀▀░█▀█░█░█
░█▀▄░█▀▀░░█░░█▀▄░█░█░█▀▀░█░█░▄▀▄
░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀░░░▀▀▀░▀░▀
     By Javier Cabrera
    
The BBS was a great time I only got to briefly
enjoy. Now this is not the actual experience,
which you can surely get by going to other
parts of the internet (you can even go online
on BBS emulators right within the browser!)
but something for modern times.

Pull and get started!
https://github.com/doncabreraphone/retrofox/
    `;
    
    const style = 'color: #ff69b4; background: #000080; padding: 2px 0; font-size: 16px; font-family: monospace;';
    
    console.log(message, style);
});
