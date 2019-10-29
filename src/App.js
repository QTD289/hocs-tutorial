import React from 'react';
import './App.css';

import Todos from './Components/Todos';

function App() {
  return (
    <div className="App">
      <Todos todos={['un', 'deux', 'trois']} />
    </div>
  );
}

export default App;
