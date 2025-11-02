import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios"; 
import { Film, Users, Search, X } from "lucide-react";
import { cn } from "../lib/utils"; 

function SearchComponent({ onResultClick = () => {}, isMobile = false }) {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getSearch = async () => {
    if (query.trim() === "") {
      setSearches([]);
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      const filtered = data.results.filter(
        (r) => r.media_type === "movie" || r.media_type === "person"
      );
      setSearches(filtered);
    } catch (error) {
      console.log(error);
      setSearches([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(getSearch, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleLinkClick = (path) => {
    setQuery("");
    setSearches([]);
    onResultClick(); 
    navigate(path);
  };

  return (
    <div
      className={cn(
        "w-full relative",
        !isMobile && "max-w-sm",
        isMobile && "mt-4"
      )}
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search movies & people..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 w-full rounded-md border border-input bg-transparent px-9 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {query.length > 0 && (
          <X
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground"
          />
        )}
      </div>

      {query.length > 0 && (
        <div className="absolute top-12 w-full max-h-[50vh] overflow-y-auto rounded-lg border border-border bg-background shadow-lg z-50">
          {isLoading ? (
            <div className="p-4 text-muted-foreground">Searching...</div>
          ) : searches.length > 0 ? (
            searches.map((elem) => {
              const Icon = elem.media_type === "movie" ? Film : Users;
              const imageUrl =
                elem.poster_path || elem.profile_path
                  ? `https://image.tmdb.org/t/p/w500${
                      elem.poster_path || elem.profile_path
                    }`
                  : null;

              return (
                <div
                  key={elem.id}
                  onClick={() =>
                    handleLinkClick(`/${elem.media_type}/details/${elem.id}`)
                  }
                  className="flex items-center p-3 border-b border-border text-foreground hover:bg-muted cursor-pointer"
                >
                  {imageUrl ? (
                    <img
                      className="w-12 h-16 object-cover rounded mr-3 shrink-0"
                      src={imageUrl}
                      alt={elem.name || elem.title}
                    />
                  ) : (
                    <div className="w-12 h-16 rounded mr-3 shrink-0 bg-muted flex items-center justify-center">
                      <Icon className="w-6 h-6 text-muted-foreground " />
                    </div>
                  )}

                  <div>
                    <span className="block font-semibold">
                      {elem.name || elem.title}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {elem.media_type === "movie" ? "Movie" : "Person"}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-4 text-muted-foreground">
              No results found for "{query}".
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
