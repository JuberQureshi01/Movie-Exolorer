import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Moviedetails from './components/Moviedetails';
import Trailer from './templates/Trailer';
import People from './components/People';
import Persondetails from './components/Persondetails';
import Favorites from './components/Favorites';
import { Toaster } from './components/ui/sonner';
import Header from './components/Header';

function App() {
  return (
    <div className="bg-background w-screen h-screen flex flex-col text-foreground">
      <Header />
      <div
        id="main-content-scrollable"
        className="w-full h-full overflow-y-auto "
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/details/:id" element={<Moviedetails />}>
            <Route path="trailer" element={<Trailer />} />
          </Route>
          <Route path="/person" element={<People />} />
          <Route path="/person/details/:id" element={<Persondetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;
