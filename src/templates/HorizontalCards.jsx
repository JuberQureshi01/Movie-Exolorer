import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Film, Users } from 'lucide-react'; 

function HorizontalCards({ data, className }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full text-center text-muted-foreground py-10 px-4 md:px-8">
        No recommendations or similar titles found.
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex overflow-x-auto gap-4 py-4 px-4 md:px-8 scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-muted',
        className
      )}
    >
      {data.map((elem, index) => (
        <Link
          to={`/${elem.media_type || 'movie'}/details/${elem.id}`}
          className="shrink-0 w-[60vw] sm:w-[40vw] md:w-[25vw] lg:w-[18vw] xl:w-[15vw] bg-card rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1"
          key={`${elem.id}-${index}`}
        >
          <ImageWithFallback elem={elem} />

          <div className="p-3">
            <h1 className="text-base font-semibold text-foreground truncate">
              {elem.name ||
                elem.title ||
                elem.original_name ||
                elem.original_title}
            </h1>

            {elem.overview && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {elem.overview}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

const ImageWithFallback = ({ elem }) => {
  const [src, setSrc] = useState(
    elem.poster_path || elem.profile_path || elem.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${ 
          elem.poster_path || elem.profile_path || elem.backdrop_path
        }`
      : null
  );

  const Icon = elem.media_type === 'person' ? Users : Film;
  const className = 'w-full h-auto aspect-2/3 object-cover';

  if (!src) {
    return (
      <div className={`${className} bg-muted flex items-center justify-center`}>
        <Icon className="w-12 h-12 text-muted-foreground" />
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={elem.title || elem.name}
      loading="lazy"
      onError={() => setSrc(null)} 
    />
  );
};

export default HorizontalCards;