import React from "react";
import { Link } from "react-router-dom";
import { Star, Film, Users } from "lucide-react"; 

function VerticleCards({ data, title }) {
  return (
    <div className="flex flex-wrap w-full justify-center px-0 md:px-4">
      {data.map((elem) => (
        <div
          className="h-fit w-[260px] lg:w-[246px] m-3 shrink-0"
          key={elem.id} 
        >
          <Link
            className="w-full relative block group"
            to={`/${elem.media_type || title}/details/${elem.id}`}
          >
            {elem.vote_average ? (
              <div className="absolute top-2 right-2 bg-background/80 text-foreground px-2 py-1 rounded-full text-sm font-semibold flex items-center gap-1 z-10">
                <Star className="text-yellow-400 w-4 h-4 fill-yellow-400" />
                {(elem.vote_average * 10).toFixed(0)}%
              </div>
            ) : null}

            <ImageWithFallback elem={elem} title={title} />

            <div className="mt-3">
              <h1 className="text-lg sm:text-xl text-foreground font-semibold truncate">
                {elem.name ||
                  elem.title ||
                  elem.original_name ||
                  elem.original_title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {elem.release_date
                  ? elem.release_date.split("-")[0]
                  : elem.first_air_date
                  ? elem.first_air_date.split("-")[0]
                  : elem.known_for_department || ""}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

const ImageWithFallback = ({ elem, title }) => {
  const [src, setSrc] = React.useState(
    elem.poster_path || elem.backdrop_path || elem.profile_path
      ? `https://image.tmdb.org/t/p/w500${
          elem.poster_path || elem.backdrop_path || elem.profile_path
        }`
      : null
  );

  const Icon = title === "person" ? Users : Film;
  const className =
    "h-auto aspect-2/3 w-full object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300";

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

export default VerticleCards;
