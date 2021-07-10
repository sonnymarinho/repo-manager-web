import React, { useState, useRef, useEffect } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';

import OutsideClickHandler from 'react-outside-click-handler';

import { FiGitBranch, FiLoader } from 'react-icons/fi';
import Repository from '../types/Repository';

interface RepositoriesProps {
  setInputEnabled: (enabled: boolean) => void;
  isInputEnabled: boolean;
  addHandler: (name: string) => void;
  isSearching: boolean;
  repositories: Repository[];
  changeRepositoryHandler: (name: string) => void;
}

const Repositories: React.FC<RepositoriesProps> = ({
  isInputEnabled,
  setInputEnabled,
  addHandler,
  isSearching,
  repositories,
  changeRepositoryHandler,
}) => {
  const [isLocalIputEnabled, setIsLocalIputEnabled] = useState(isInputEnabled);

  const inputRef = useRef<HTMLInputElement>(null);

  const toggleInput = (active: boolean): void => {
    setInputEnabled(active);
  };

  const addAnewRepository = (repositoryName: string) => {
    addHandler(repositoryName);
    if (inputRef.current) inputRef.current.value = '';
  };

  useEffect(() => {
    if (inputRef.current) {
      const shouldClearInput = !isInputEnabled && isLocalIputEnabled;
      const shouldSetFocus = isInputEnabled && !isLocalIputEnabled;

      inputRef.current.disabled = !isInputEnabled;

      if (shouldClearInput) inputRef.current.value = '';
      if (shouldSetFocus) inputRef.current.focus();
    }

    setIsLocalIputEnabled(isInputEnabled);
  }, [isInputEnabled]);

  const onClickOutside = (): void => {
    toggleInput(false);
  };

  const handleAddRepositoryClick = (): void => {
    toggleInput(true);
  };

  const onKeyDownHandler = (event: any) => {
    if (event.code === 'Tab') toggleInput(false);

    if (event.code === 'Enter' && inputRef.current) {
      const repositoryName = inputRef.current.value;

      addAnewRepository(repositoryName);
    }
  };

  return (
    <div className="flex flex-col overflow-y-auto">
      <OutsideClickHandler onOutsideClick={() => onClickOutside()}>
        <div className="flex-shrink-0 flex justify-between items-center relative bg-gray-800 rounded-xl h-12 shadow-xl">
          <input
            ref={inputRef}
            onKeyDown={onKeyDownHandler}
            type="text"
            placeholder={`${isInputEnabled ? '' : 'Repositories'}`}
            className={`border-4 bg-transparent caret-gray-400 text-gray-200
            focus:outline-none w-full h-full rounded-xl pl-11 ${
              isInputEnabled ? ` border-blue-500` : 'border-none'
            }`}
          />

          <button
            onClick={() => handleAddRepositoryClick()}
            type="button"
            className={`absolute flex items-center justify-center h-9 w-9 cursor-pointer ${
              isInputEnabled
                ? 'bg-blue-500 text-gray-900 right-1 h-10 w-10'
                : 'text-gray-500 hover:bg-blue-500 hover:text-gray-900 right-2 rounded-lg'
            }`}
          >
            {isSearching ? (
              <FiLoader size={24} className="animate-spin" />
            ) : (
              <HiOutlinePlus size={24} />
            )}
          </button>
        </div>
      </OutsideClickHandler>
      <div className="bg-gray-800 rounded-xl px-8 py-2 mt-3 shadow-xl h-full overflow-y-scroll">
        <ul className="text-gray-400">
          {repositories.map(({ name, id }) => (
            <Item
              key={id}
              name={name}
              onClick={() => changeRepositoryHandler(name)}
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
