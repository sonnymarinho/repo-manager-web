import React from 'react';
import { Author as IAuthor } from '../types/Author';

interface AuthorProps {
  data: IAuthor;
}

const Author: React.FC<AuthorProps> = ({
  data: { name, email, avatarUrl, login },
}) => {
  const validLabel = name || login;
  const thereIsNoValidLabel = !name && !email;

  return (
    <div className="flex transition-all w-full max-w-60">
      <img src={avatarUrl} alt={name} className="h-12 w-12 rounded-full mr-3" />
      {thereIsNoValidLabel ? (
        <div className="flex items-center px-5">
          <p>{validLabel}</p>
        </div>
      ) : (
        <div className="flex flex-col justify-evenly">
          <p className="text-gray-400 text-sm overflow-ellipsis">{name}</p>
          <p className="text-gray-500 text-xs overflow-ellipsis">{email}</p>
        </div>
      )}
    </div>
  );
};

export default Author;
