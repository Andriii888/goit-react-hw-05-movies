import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Cast = () => {
  const [infoActors, setimgActors] = useState([]);
  const [imgURL] = useState('/nAEw0wWZ5JOnqxwHI34xe1GxIIc.jpg');

  const { movieId } = useParams();
  useEffect(() => {
    if (infoActors.length > 0) {
      return;
    }
    async function fetchActorsInfo() {
      try {
        await axios
          .get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=dbe66e1851c0a98cf79fd3fa903ac46b`
          )
          .then(({ data }) => {
            setimgActors(() =>
              data.cast.map(({ original_name, name, profile_path }) => {
                return (
                  <li key={original_name ?? name}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${
                        profile_path ?? imgURL
                      }`}
                      width="200px"
                      height="250px"
                      alt=""
                    />
                    <p>{original_name}</p>
                  </li>
                );
              })
            );
          });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchActorsInfo();
  }, [imgURL, infoActors, movieId]);

  return (
    <ul>
      {infoActors}
      {infoActors.length === 0 && (
        <h1>We dont have any reviews for this movie</h1>
      )}
    </ul>
  );
};

export default Cast;
