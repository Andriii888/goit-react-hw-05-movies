import { useParams, Link, Outlet, useLocation ,useNavigate} from 'react-router-dom';
import { useEffect, useState,useCallback } from 'react';
import axios from 'axios';
import MovieDetailsStyle from './MovieDetails.styled';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [vote_average, setvote_average] = useState('');
  const [title, settitle] = useState('');
  const [name, setname] = useState('');
  const [genresMovie, setgenres] = useState('');
  const [release_date, setrelease_date] = useState('');
  const [overview, setoverview] = useState('');
  const [imgURL, setimgUrl] = useState('');
  const location = useLocation();
  // const backLinkHref = location.state?.from ?? '/movies';

  useEffect(() => {
    if (!movieId) {
      return;
    }
    async function fetchMovieById() {
      try {
        await axios
          .get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=dbe66e1851c0a98cf79fd3fa903ac46b`
          )
          .then(({ data }) => {
            const {
              name,
              title,
              genres,
              release_date,
              overview,
              poster_path,
              vote_average,
            } = data;
            setvote_average(vote_average);
            settitle(title);
            setname(name);
            setgenres(() => {
              const allGenres = genres.map(genr => genr.name).toString();
              return allGenres;
            });
            setrelease_date(() => release_date);
            setoverview(overview);
            axios
              .get(`https://image.tmdb.org/t/p/original${poster_path}`)
              .then(({ request }) => setimgUrl(request.responseURL));
          });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMovieById();
  }, [movieId]);
  const navigate = useNavigate();
  const from = location.state?.from || "/"; 
  const goBack = useCallback(()=> navigate(from), [from, navigate]);

  return (
    <section>
      <MovieDetailsStyle className="infoMovieContainer">
        <button type='button' onClick={goBack} >Go back</button>
        <img src={imgURL} width="300px" height="350px" alt="" />
        <div className="infoMovie">
          <h1>
            {name ?? title}
            {release_date}
          </h1>
          <p>User Score:{vote_average}</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <p>{genresMovie}</p>
          <div>
            <h3>Additional information</h3>
            <Link
              className="infoLink"
              to="cast"
              state={{from}}
              // { from: location.state.from }
            >
              Cast
            </Link>
            <Link
              className="infoLink"
              to="reviews"
              state={{from}}
              // { from: location.state.from }
            >
              Reviews
            </Link>
          </div>
        </div>
      </MovieDetailsStyle>
      <Outlet />
    </section>
  );
};
export default MovieDetails;
