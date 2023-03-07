import { Link, useLocation } from 'react-router-dom';

const MoviesList = ({ data }) => {
  const location = useLocation();
  const elements = data.map(({ title, name, id }) => {
    return (
      <li key={id}>
        <Link to={`/movies/${id}` ?? `${id}`} state={{ from: location }}>
          {title ?? name}
        </Link>
      </li>
    );
  });
  return <ul>{elements}</ul>;
};
export default MoviesList;
