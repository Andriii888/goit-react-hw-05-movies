import { NavLink } from 'react-router-dom';
import NavBarStyles from './NavBarStyles.styled';

const NavBar = () => {
  return (
    <NavBarStyles>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/movies">Movies</NavLink>
      </li>
    </NavBarStyles>
  );
};
export default NavBar;
