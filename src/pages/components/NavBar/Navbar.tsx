import { Link } from 'react-router-dom';
import cls from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <header className={cls.header}>
      <div>
        <Link to="/">Home</Link>
        <Link to="/posts">Blog</Link>
        <Link to="/about">About</Link>
      </div>
    </header>
  );
};
