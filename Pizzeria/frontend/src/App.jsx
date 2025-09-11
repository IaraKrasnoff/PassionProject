import React, { useState } from 'react';
import About from './components/About';
import Contact from './components/Contact';
import PizzaMenu from './components/PizzaMenu';
import OrderNow from './components/OrderNow';
import Admin from './components/Admin';

export default function App(){
  const [activeTab, setActiveTab] = useState('sobre');

  const renderContent = () => {
    switch(activeTab) {
      case 'sobre':
        return <About />;
      case 'sabores':
        return <PizzaMenu />;
      case 'peca-agora':
        return <OrderNow />;
      case 'contato':
        return <Contact />;
      case 'admin':
        return <Admin />;
      default:
        return <About />;
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Pizzaria Don Chevico</h1>
        <nav className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'sobre' ? 'active' : ''}`}
            onClick={() => setActiveTab('sobre')}
          >
            Sobre
          </button>
          <button 
            className={`nav-tab ${activeTab === 'sabores' ? 'active' : ''}`}
            onClick={() => setActiveTab('sabores')}
          >
            Sabores
          </button>
          <button 
            className={`nav-tab ${activeTab === 'peca-agora' ? 'active' : ''}`}
            onClick={() => setActiveTab('peca-agora')}
          >
            Peça Agora
          </button>
          <button 
            className={`nav-tab ${activeTab === 'contato' ? 'active' : ''}`}
            onClick={() => setActiveTab('contato')}
          >
            Contato
          </button>
          <button 
            className={`nav-tab ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            Admin
          </button>
        </nav>
      </header>

      <main className="main-content">
        {renderContent()}
      </main>

      <footer className="footer">© Pizzaria Don Chevico</footer>
    </div>
  );
}
