import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from '../pages/Home'; 
import About from '../pages/About'; 

const AppRouter: React.FC = () => {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
  );
};

export default AppRouter;
