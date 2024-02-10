import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './containers/Home/Home';
import AddQuote from './containers/AddQuote/AddQuote';
import NotFound from './containers/NotFound/NotFound';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="page-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quotes" element={<Home />}/>
            <Route path="/new-quote" element={<AddQuote />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;