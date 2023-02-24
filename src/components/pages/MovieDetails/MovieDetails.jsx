import { useParams ,Link,Outlet} from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  const [poster_path, setposter_path] = useState('');
  const [imgURL] = useState('https://image.tmdb.org/t/p/original');

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
            setgenres(()=>{const allGenres = genres.map(genr => genr.name).toString();
              return allGenres;
            });
            setrelease_date(()=> release_date);
            setoverview(overview);
            setposter_path(poster_path);
          });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMovieById();
  }, [movieId]);
  return (<section><MovieDetailsStyle className='infoMovieContainer'>
      <img src={imgURL + poster_path} width = '300px'height="350px"alt="" />
      <div className='infoMovie'><h1>
        {name || title}
        {release_date}
      </h1>
      <p>User Score:{vote_average}</p>
      <h2>Overview</h2>
      <p>{overview}</p>
      <h2>Genres</h2>
      <p>{genresMovie}</p>
      <div>
        <h3>Additional information</h3>
      <Link className="infoLink" to ='cast' >Cast</Link>
      <Link className="infoLink" to='reviews' >Reviews</Link>
      </div></div>
      
    </MovieDetailsStyle>
      <Outlet/>
    </section>
    
  );
};
export default MovieDetails;

