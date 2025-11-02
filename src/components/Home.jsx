import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import VerticleCards from "../templates/VerticleCards";
import InfiniteScroll from "react-infinite-scroll-component";
import StateDisplay from "../templates/StateDisplay";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  ChevronDown,
  TrendingUp,
  Star,
  Calendar,
  Play,
} from "lucide-react";
import HomeSkeleton from "../templates/loaders/HomeSkeleton";

const filterOptions = [
  { value: "popular", label: "Popular", icon: TrendingUp },
  { value: "top_rated", label: "Top Rated", icon: Star },
  { value: "upcoming", label: "Upcoming", icon: Calendar },
  { value: "now_playing", label: "Now Playing", icon: Play },
];

function Home() {
  const [category, setCategory] = useState("popular");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  document.title = "Movie Explorer | Home";
  useEffect(() => {
    const getMovies = async () => {
      if (page === 1) setLoading(true);
      console.log(`Fetching movies for category: ${category}, page: ${page}`);
      try {
        setError(null);
        const { data } = await axios.get(`/movie/${category}?page=${page}`);

        if (data.results.length > 0) {
          setMovies((prev) =>
            page === 1 ? data.results : [...prev, ...data.results]
          );
          setHasMore(data.page < data.total_pages);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, [category, page]);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
  };

  if (error) return <StateDisplay type="error" message={error} />;
  if (loading && movies.length === 0) return <HomeSkeleton />;
  if (!loading && movies.length === 0 && !hasMore)
    return (
      <StateDisplay type="empty" message="No movies found for this category." />
    );

  const currentFilter =
    filterOptions.find((opt) => opt.value === category) || filterOptions[0];
  const CurrentIcon = currentFilter.icon;

  return (
    <div className="w-full min-h-screen px-4 py-6 md:px-8">
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-semibold text-muted-foreground hover:text-foreground">
          Discover Movies
        </h1>

        <div >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-[200px] justify-between text-muted-foreground hover:text-foreground"
              >
                <span className="flex items-center gap-2 ">
                  <CurrentIcon className="w-4 h-4" />
                  {currentFilter.label}
                </span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full md:w-[200px] ">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={category}
                onValueChange={handleCategoryChange}
              >
                {filterOptions.map((option) => (
                  <DropdownMenuRadioItem
                    key={option.value}
                    value={option.value}
                    className="flex items-center gap-2"
                  >
                    <option.icon className="w-4 h-4" />
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <InfiniteScroll
        loader={<HomeSkeleton />}
        dataLength={movies.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        scrollableTarget="main-content-scrollable"
      >
        <VerticleCards data={movies} title="movie" />
      </InfiniteScroll>
    </div>
  );
}

export default Home;
