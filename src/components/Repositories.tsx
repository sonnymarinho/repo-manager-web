import React from 'react';

import { FiGitBranch, FiPlus } from 'react-icons/fi';
import PrRepository from '../types/PrRepository';

interface RepositoriesProps {
  handleClickAddRepoButton: () => void;
  repositories: PrRepository[];
  changeRepositoryHandler: (repository: PrRepository) => void;
  currentRepository?: PrRepository;
}

const Repositories: React.FC<RepositoriesProps> = ({
  handleClickAddRepoButton,
  repositories,
  changeRepositoryHandler,
  currentRepository,
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
      <div className="bg-gray-800 rounded-xl pl-8 px-2 py-2 mt-3 shadow-xl h-full overflow-y-scroll">
        <ul className="text-gray-400 pt-3 w-full">
          {repositories.map(repository => (
            <Item
              key={repository.id}
              name={repository.name}
              onClick={() => changeRepositoryHandler(repository)}
              active={currentRepository?.id === repository.id}
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
  active?: boolean;
}

const Item: React.FC<ItemProps> = ({ name, onClick, active }) => {
  return (
    <li
      className={`
      flex h-10 items-center text-sm cursor-pointer transform transition
      mr-4 pl-3 rounded-lg border-2 border-transparent
    hover:bg-gray-600 hover:text-gray-200
    ${active ? 'bg-gray-600 text-gray-200 ' : ''}`}
      onClick={onClick}
    >
      <FiGitBranch />
      <span className="ml-3">{name}</span>
    </li>
  );
};

export default Repositories;
