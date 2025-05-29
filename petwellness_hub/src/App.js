import React from 'react';
import './App.css';
import TopNavBar from "./TopNavBar";

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <TopNavBar />

      <main>
        <div className="container" style={{ paddingTop: 80 }}>
          <div className="hero">
            <div className="subtitle">AI Workflow Manager Template</div>
            <h1 className="title">petwellness_hub</h1>
            <div className="description">Start building your application.</div>
            <button className="btn btn-large">Button</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;