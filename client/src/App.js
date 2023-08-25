import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Update the import statement
import Home from './components/Home';
import Profile from './components/Profile';
import Contact from './components/Contact';

const App = () => {
  const client = new QueryClient();

  return (
    <div className='App'>
      <QueryClientProvider client={client}>
        <BrowserRouter> {/* Use BrowserRouter here */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<h1>404 Page not found</h1>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
