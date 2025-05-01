import React from 'react';
import MainLayout from './components/layouts/MainLayout';
import Tables from './pages/Tables';
import { AuthProvider } from './contexs/AuthContext';

const App: React.FC = () => {

  return (<AuthProvider>
    <MainLayout>
      <Tables />
    </MainLayout>
  </AuthProvider>);
};

export default App;
