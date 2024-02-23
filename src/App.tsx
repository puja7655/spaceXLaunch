import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LaunchDetails from './components/LaunchDetails';
import LaunchList from './components/LaunchList';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/launches/:launchId" element={<LaunchDetails />}/>
          <Route path="/" element={<LaunchList />}/>           
        </Routes>
      </div>
    </Router>
  );
};

export default App;
