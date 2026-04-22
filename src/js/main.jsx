import React from 'react';
import ReactDOM from 'react-dom/client';

// Bootstrap global
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Estilos globales
import '../styles/index.css';

// Componente principal
import Home from './components/Home';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
