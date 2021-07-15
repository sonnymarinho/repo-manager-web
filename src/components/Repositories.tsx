import React from 'react';

import { FiGitBranch, FiPlus } from 'react-icons/fi';
import PrRepository from '../types/PrRepository';

interface RepositoriesProps {
  handleClickAddRepoButton: () => void;
  repositories: PrRepository[];
  changeRepositoryHandler: (repository: PrRepository) => void;
}

const Repositories: React.FC<RepositoriesProps> = ({
  handleClickAddRepoButton,
  repositories,
  changeRepositoryHandler,
}) => {
  const handleAddRepositoryClick = (): void => {
    handleClickAddRepoButton();
  };

  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="flex-shrink-0 flex justify-between items-center relative bg-gray-800 rounded-xl h-12 shadow-xl">
        <span className="border-4 text-gray-400 border-none ml-9">
          Repositories
        </span>

        <button
          onClick={() => handleAddRepositoryClick()}
          type="button"
          className={`absolute flex items-center justify-center h-9 w-9
            text-gray-500 hover:bg-blue-500 hover:text-gray-900 right-2 rounded-lg`}
        >
          <FiPlus size={24} />
        </button>
      </div>
      <div className="bg-gray-800 rounded-xl px-8 py-2 mt-3 shadow-xl h-full overflow-y-scroll">
        <ul className="text-gray-400">
          {repositories.map(repository => (
            <Item
              key={repository.id}
              name={repository.name}
              onClick={() => changeRepositoryHandler(repository)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

interface ItemProps {
  name: string;
  onClick: () => void;
}

const Item: React.FC<ItemProps> = ({ name, onClick }) => {
  return (
    <li
      className="flex h-10 items-center text-sm cursor-pointer
      transform transition
    hover:text-gray-200 hover:font-bold hover:translate-x-3"
      onClick={onClick}
    >
      <FiGitBranch />
      <span className="ml-3">{name}</span>
    </li>
  );
};

export default Repositories;
