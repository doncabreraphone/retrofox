import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TerminalComponent from './Terminal';
import PrivateRoute from './PrivateRoute';
import ExpatsPage from './ExpatsPage';
import './App.css';


const AuthContext = createContext();

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      <Router>
        <Routes>
          <Route path="/" element={<TerminalComponent />} />
          <Route
            path="/expats"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ExpatsPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
export { AuthContext };
