import axios from 'axios';
import { useState } from 'react';

const API = q => {
  const [query, setQuery] = useState(q);
  return axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=dbe66e1851c0a98cf79fd3fa903ac46b')
};

API.defaultProps = {
  q: 'trending',
};

export default API;
