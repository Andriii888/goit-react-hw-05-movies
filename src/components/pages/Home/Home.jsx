import { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import MoviesList from '../../pages/MoviesList/MoviesList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const API = () => {
    return axios.get(
      'https://api.themoviedb.org/3/trending/all/day?api_key=dbe66e1851c0a98cf79fd3fa903ac46b'
    );
  };
  useEffect(() => {
    async function fetchMovies() {
      try {
        await API().then(({ data }) => setMovies([...data.results]));
      } catch (error) {
        setError(error.message);
      } finally {
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <MoviesList data={movies} />
      {error && <h1>{error}</h1>}
      <Outlet />
    </>
  );
};
MoviesList.defaultProps = {
  items: [],
};
export default Home;
