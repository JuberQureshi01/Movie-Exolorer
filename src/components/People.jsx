import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import VerticleCards from '../templates/VerticleCards';
import InfiniteScroll from 'react-infinite-scroll-component';
import StateDisplay from '../templates/StateDisplay'; 
import HomeSkeleton from '../templates/loaders/HomeSkeleton';

function People() {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  document.title = 'Movie Explorer | People';

  const getPeople = async () => {
    try {
      setError(null);
      const { data } = await axios.get(`/person/popular?page=${page}`);
      if (data.results.length > 0) {
        setPeople((prev) => [...prev, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
      setError('Failed to fetch people. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const refreshHandler = () => {
    setLoading(true);
    setPage(1);
    setPeople([]);
    setHasMore(true);
    getPeople();
  };

  useEffect(() => {
    refreshHandler();
  }, []);

  if (error) {
    return <StateDisplay type="error" message={error} />;
  }

  if (loading && people.length === 0) {
    return <HomeSkeleton />;
  }

  if (!loading && people.length === 0 && !hasMore) {
    return <StateDisplay type="empty" message="No people found." />;
  }

  return (
    <div className="w-full min-h-screen px-4 py-6">
      <h1 className="text-3xl font-semibold text-zinc-300 mb-8">
        Popular People
      </h1>

      <InfiniteScroll
        loader={<HomeSkeleton />}
        dataLength={people.length}
        next={getPeople}
        hasMore={hasMore}
        scrollableTarget="main-content-scrollable"
      >
        <VerticleCards data={people} title="person" />
      </InfiniteScroll>
    </div>
  );
}

export default People;
