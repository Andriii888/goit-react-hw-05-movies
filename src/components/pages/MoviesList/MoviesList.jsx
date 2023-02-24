import {Link} from 'react-router-dom';

const MoviesList = ({data})=>{
const elements = data.map(({title,name,id})=>{
  return <li key={id}><Link to={`movies/${id}`} >{title || name}</Link>
  </li> })
    return (<ul>{elements}</ul> )
}
export default MoviesList;
