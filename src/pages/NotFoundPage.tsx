import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div>
      This page doesn't exist. Go{' '}
      <Link style={{ color: 'blue' }} to="/">
        home
      </Link>
    </div>
  );
};
