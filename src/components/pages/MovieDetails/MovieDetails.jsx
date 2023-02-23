import { useParams ,Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [vote_average, setvote_average] = useState('');
  const [title, settitle] = useState('');
  const [name, setname] = useState('');
  const [genres, setgenres] = useState('');
  const [release_date, setrelease_date] = useState('');
  const [overview, setoverview] = useState('');
  const [poster_path, setposter_path] = useState('');
  const [img, setimg] = useState('');

  useEffect(() => {
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
            setgenres(genres);
            setrelease_date(release_date);
            setoverview(overview);
            setposter_path(poster_path);
          });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMovieById();
  }, [movieId]);

  return (
    <div>
      {poster_path && <img src="" alt="" />}
      <h1>
        {name || title}
        {release_date}
      </h1>
      <p>User Score:{vote_average}</p>
      <h2>Overview</h2>
      <p>{overview}</p>
      <h2>Genres</h2>
      {/* <p>{genres}</p> */}
      <div>
        <h3>Additional information</h3>
      <Link to ='cast' >Cast</Link>
      <Link to='reviews' >Reviews</Link>
      </div>
    </div>
  );
};
export default MovieDetails;
// useEffect(() => {
//    if(poster_path){async function fetchImg (){await axios
//     .get(
//       `https://api.themoviedb.org/3/movie/${movieId}${poster_path}?api_key=dbe66e1851c0a98cf79fd3fa903ac46b`
//     )
//     .then(({ data }) => {
//       console.log(data)
//       // const { } = data;

//     });}
//     fetchImg();}
// }, [poster_path])
