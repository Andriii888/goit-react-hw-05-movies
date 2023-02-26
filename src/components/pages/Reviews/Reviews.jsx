import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setreviews] = useState('');

  const { movieId } = useParams();
  useEffect(() => {
    if (reviews > 0) {
      return;
    }
    if (reviews === '') {
      async function fetchReviews() {
        try {
          await axios
            .get(
              `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=dbe66e1851c0a98cf79fd3fa903ac46b`
            )
            .then(({ data }) => {
              setreviews(() => {
                return data.results.map(({ author, content }) => {
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
    }
  }, [movieId, reviews]);

  return (
    <ul>
      {reviews}
      {reviews.length === 0 && <h1>There is nothing to show</h1>}
    </ul>
  );
};

export default Reviews;
