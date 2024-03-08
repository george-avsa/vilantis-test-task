import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/style.css";
import App from './App';


function RootComponent() {
  return <App />;
};

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(<RootComponent />);