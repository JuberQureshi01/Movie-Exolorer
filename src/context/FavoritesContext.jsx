import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('movie-favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('movie-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  }, [favorites]);

  const addFavorite = (movie) => {
    const movieWithMeta = { ...movie, media_type: 'movie' };
    setFavorites((prevFavorites) => [...prevFavorites, movieWithMeta]);
  };

  const removeFavorite = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== movieId)
    );
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
