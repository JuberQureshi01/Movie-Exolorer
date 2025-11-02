import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import VerticleCards from '../templates/VerticleCards';
import { Link } from 'react-router-dom';

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-3xl font-semibold text-zinc-300 mb-6">
        My Favorites
      </h1>
      {favorites.length > 0 ? (
        <VerticleCards data={favorites} title="movie" />
      ) : (
        <div className="text-center text-zinc-400 mt-20">
          <p className="text-xl">Your favorites list is empty.</p>
          <p>Movies you add to favorites will appear here.</p>
          <Link
            to="/"
            className="text-lg text-[#6556CD] hover:underline mt-4 inline-block"
          >
            Find some movies
          </Link>
        </div>
      )}
    </div>
  );
}

export default Favorites;
