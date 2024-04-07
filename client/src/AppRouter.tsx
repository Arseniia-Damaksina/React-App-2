import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import TaskBoards from './pages/TaskBoards'; 
import TaskBoard from './pages/TaskBoard'; 

const AppRouter: React.FC = () => {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<TaskBoards />} />
          <Route path="/taskboard/:id" element={<TaskBoard />} />
        </Routes>
      </Layout>
  );
};

export default AppRouter;
