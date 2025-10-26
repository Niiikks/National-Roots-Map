import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import InteractiveMap from './components/InteractiveMap';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className="App">
      {currentPage === 'landing' ? (
        <LandingPage onNavigateToMap={() => setCurrentPage('map')} />
      ) : (
        <InteractiveMap onNavigateHome={() => setCurrentPage('landing')} />
      )}
    </div>
  );
}

export default App;