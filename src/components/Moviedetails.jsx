import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import asyncloadmovie, { removemovie } from "../store/actions/movieActions";
import HorizontalCards from "../templates/HorizontalCards";
import {
  Star,
  PlayCircle,
  Heart,
  ArrowLeft,
  Link as LinkIcon,
  Globe,
  Calendar,
  Clock,
} from "lucide-react"; 
import { useFavorites } from "../context/FavoritesContext"; 
import { Button } from "./ui/button"; 
import { toast } from "sonner";
import MovieDetailSkeleton from "../templates/loaders/MovieDetailSkeleton";

function Moviedetails() {
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.movie);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const {  addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id, dispatch]);

  if (!info) {
    return <MovieDetailSkeleton />;
  }


  const isFav = isFavorite(info.detail.id);


const handleFavoriteClick = () => {
  if (isFav) {
    removeFavorite(info.detail.id);
    toast.success(`${info.detail.title} removed from favorites.`);
  } else {
    addFavorite(info.detail);
    toast.success(`${info.detail.title} added to favorites.`);
  }
};

  const releaseYear = info.detail.release_date
    ? info.detail.release_date.split("-")[0]
    : "N/A";
  const rating = (info.detail.vote_average * 10).toFixed(0);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(31, 30, 36, 0.9), rgba(31, 30, 36, 1) 80%), url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path})`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full min-h-screen px-6 sm:px-[5%] py-8"
    >
      <nav className="h-[10vh] flex gap-5 sm:gap-10 items-center text-xl text-zinc-300 mb-5">
        <button
          className="hover:text-[#6556CD] flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} /> Back
        </button>
        {info.detail.homepage && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={info.detail.homepage}
          >
            <LinkIcon size={20} />
          </a>
        )}
        {info.externalids.wikidata_id && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.wikidata.org/wiki/${info.externalids.wikidata_id}`}
          >
            <Globe size={20} />
          </a>
        )}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.imdb.com/title/${info.externalids.imdb_id}/`}
        >
          IMDb
        </a>
      </nav>

      <div className="w-full flex flex-col lg:flex-row mt-5 gap-8">
        <img
          className="h-auto max-h-[70vh] w-full lg:w-[30%] object-cover rounded-lg shadow-lg"
          src={`https://image.tmdb.org/t/p/original${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt="Movie Poster"
        />
        <div className="content w-full lg:w-[70%] text-white">
          <h1 className="text-4xl sm:text-6xl font-bold">
            {info.detail.title || info.detail.original_title}
            <span className="text-3xl font-light text-zinc-400 ml-2">
              ({releaseYear})
            </span>
          </h1>

          <div className="flex flex-wrap gap-x-6 gap-y-3 items-center mt-4 text-zinc-300">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" size={20} />
              <span className="text-xl font-bold">{rating}%</span>
              <span className="text-sm">User Score</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{info.detail.release_date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{info.detail.runtime} min</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {info.detail.genres.map((g) => (
              <span
                key={g.id}
                className="bg-zinc-700 text-zinc-200 px-3 py-1 rounded-full text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>

          <h2 className="text-xl font-semibold italic text-zinc-400 mt-6">
            {info.detail.tagline}
          </h2>
          <h2 className="text-3xl font-semibold mt-6 mb-2">Overview</h2>
          <p className="text-zinc-300 leading-relaxed">
            {info.detail.overview}
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              className="bg-[#6556CD] py-3 px-5 rounded-lg flex items-center gap-2 text-lg font-semibold hover:bg-[#5345a5] transition-colors"
              to={`${pathname}/trailer`}
            >
              <PlayCircle /> Play Trailer
            </Link>

            <Button
              variant={isFav ? "destructive" : "default"}
              size="lg"
              className="flex items-center gap-2 text-lg font-semibold"
              onClick={handleFavoriteClick}
            >
              <Heart /> {isFav ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[80%] mt-12 flex flex-col gap-5">
        <h2 className="text-2xl font-semibold mb-3">Where to Watch</h2>
        {["flatrate", "rent", "buy"].map(
          (type) =>
            info.watchproviders?.[type] && (
              <div key={type} className="flex flex-wrap gap-4 items-center">
                <h3 className="text-lg font-semibold text-zinc-300 w-20">
                  {type.charAt(0).toUpperCase() + type.slice(1)}:
                </h3>
                {info.watchproviders[type].map((elem, index) => (
                  <img
                    key={index}
                    title={elem.provider_name}
                    className="w-12 h-12 object-cover rounded-xl"
                    src={`https://image.tmdb.org/t/p/original${elem.logo_path}`}
                    alt={elem.provider_name}
                  />
                ))}
              </div>
            )
        )}
      </div>

      <hr className="mt-10 border-none h-px bg-zinc-700" />
      <h2 className="text-3xl font-bold mt-10">You Might Also Like</h2>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  );
}

export default Moviedetails;
