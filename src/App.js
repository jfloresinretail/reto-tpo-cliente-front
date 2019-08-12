import React from 'react';
import './App.css';
import ClientsContainer from './components/ClientsComponent'

function App() {
  return (
    <div className="container">
      <div className="header">
        <h1>Client List</h1>
      </div>
      <ClientsContainer />
    </div>
  );
}

export default App;
