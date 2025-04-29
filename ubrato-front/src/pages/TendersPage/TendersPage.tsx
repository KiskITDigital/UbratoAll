import { FC } from 'react';
import { Link } from 'react-router-dom';

export const TendersPage: FC = () => {
  return (
    <div>
      <h1 className=''>Tenders</h1>
      <Link to="/">Home page</Link>
    </div>
  );
};
