import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import axios from 'axios';
import MoviesList from '../MoviesList/MoviesList';

const Movies = () => {
  const [filmQuery, setfilmQuery] = useState('');
  const [dataQuery, setdataQuery] = useState([]);
  const [searchParams, setsearchParams] = useSearchParams();
  const query = searchParams.get('filmQuery');

  const handleQueryChange = e => {
    e.preventDefault();
    setfilmQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = useCallback(
    ({ filmQuery }) => {
      setsearchParams({ filmQuery });
      setdataQuery([]);
    },
    [setsearchParams]
  );

  useEffect(() => {
    if (query) {
      async function fetchVideoByQuery() {
        try {
          await axios
            .get(
              `https://api.themoviedb.org/3/search/movie?api_key=dbe66e1851c0a98cf79fd3fa903ac46b&language=en-US&query=${query}&page=1&include_adult=false`
            )
            .then(({ data }) => setdataQuery([...data.results]));
        } catch (error) {
          console.log(error.message);
        }
      }
      fetchVideoByQuery();
    }
  }, [query, setdataQuery]);

  return (
    <div className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          name="filmQuery"
          value={filmQuery}
          onChange={handleQueryChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>
      </form>
      {dataQuery.length > 0 && <MoviesList data={dataQuery} />}
    </div>
  );
};
export default Movies;
