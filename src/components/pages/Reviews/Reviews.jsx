import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setreviews] = useState([]);
  const [imgURL] = useState('https://image.tmdb.org/t/p/original');

  const { movieId } = useParams();
  useEffect(() => {
    async function fetchReviews() {
      try {
        await axios
          .get(
            `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=dbe66e1851c0a98cf79fd3fa903ac46b`
          )
          .then(({ data }) => {
            console.log(data)
            setreviews(() => {
                data.results.map(({ author, content }) => {
                    
                  return (
                      <li key={author}>
                    <h3>{author}</h3>
                    <p>{content}</p>
                  </li>
                );
            });
           
        });
          });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchReviews();
  }, [imgURL, movieId, reviews]);

  return <ul>{reviews}</ul>;
};

export default Reviews;
