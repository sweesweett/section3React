import { Link } from 'react-router-dom';
const Nav = () => {
  return (
    <div className='Nav'>
      <Link to='/'>
        <span class='material-icons'>person</span>
      </Link>
      <Link to='/like'>
        <span class='material-icons'>favorite</span>
      </Link>
      <Link to='todo'>
        <span class='material-icons'>article</span>
      </Link>
    </div>
  );
};
export default Nav;
