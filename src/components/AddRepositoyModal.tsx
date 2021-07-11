import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FiLoader, FiPlus } from 'react-icons/fi';

import OutsideClickHandler from 'react-outside-click-handler';
import { DEFAULT_PULL_REQUESTS_QUANTITY } from '../config/constants';
import { Author } from '../types/Author';
import PrRepository from '../types/PrRepository';
import { PULL_REQUEST_ORDER } from '../types/PullRequests';

interface FormData {
  repository: {
    owner: string;
    name: string;
  };
  pullRequests: {
    order: string;
    quantity: number;
  };
}

interface AddRepositoryModalProps {
  setIsOpen: (value: boolean) => void;
  addNewRepositoryHandler: (fullStateRepository: PrRepository) => void;
  userInfo: Author;
  isLoading: boolean;
}

const AddRepositoryModal: React.FC<AddRepositoryModalProps> = ({
  setIsOpen,
  userInfo: { login: owner },
  addNewRepositoryHandler,
  isLoading,
}) => {
  const { register, handleSubmit } = useForm();

  const inputRepositoryName = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRepositoryName.current) inputRepositoryName.current.focus();
  }, []);

  const submitFormHandler = ({ repository, pullRequests }: FormData) => {
    const prRespository: PrRepository = {
      id: '',
      name: repository.name,
      nameWithOwner: `${repository.owner}/${repository.name}`,
      pullRequests: {
        order: pullRequests.order as PULL_REQUEST_ORDER,
        quantity: Number(pullRequests.quantity),
      },
    };

    addNewRepositoryHandler(prRespository);
  };

  return (
    <motion.div
      initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
      animate={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      exit={{ opacity: 0 }}
      className="absolute w-full h-full
    flex justify-center "
    >
      <OutsideClickHandler
        display="contents"
        onOutsideClick={() => setIsOpen(false)}
      >
        <motion.form
          onSubmit={handleSubmit(submitFormHandler)}
          initial={{ top: -100 }}
          animate={{ top: '9rem' }}
          exit={{ top: -100 }}
          className="absolute w-full max-w-2xl max-h-36 top-36 bg-gray-800
      flex justify-evenly rounded-lg text-gray-500 py-3 shadow-xl pb-5"
        >
          <label htmlFor="repository-name">
            Repository Name
            <div
              className="flex
            items-center mt-3
          bg-gray-600 rounded-lg px-5 h-9"
            >
              <input
                {...register('repository.owner')}
                type="text"
                placeholder={owner}
                className="focus:outline-none bg-transparent text-gray-50 h-full w-36"
                defaultValue={owner}
              />
              <div className="w-8">
                <hr className="border-gray-400 w-4 flex-shrink-0 transform -rotate-85 m-0 my-3" />
              </div>
              <input
                {...register('repository.name')}
                ref={inputRepositoryName}
                type="text"
                className="focus:outline-none bg-transparent text-gray-50 h-full w-36"
                id="repository-name"
              />
            </div>
          </label>
          <label htmlFor="requests-quantity" className="">
            Quantity
            <div
              className="flex
            items-center mt-3
          bg-gray-600 rounded-lg px-3 h-9"
            >
              <div className="w-20 h-full text-gray-50 bg-gray-600">
                <select
                  {...register('pullRequests.order')}
                  className="h-full w-full bg-transparent text-gray-50"
                >
                  <option
                    value="last"
                    className="bg-gray-600 hover:bg-gray-700"
                  >
                    last
                  </option>
                  <option
                    value="first"
                    className="bg-gray-600 hover:bg-gray-700 rounded-b-lg"
                  >
                    first
                  </option>
                </select>
              </div>
              <hr />
              <input
                {...register('pullRequests.quantity')}
                type="number"
                defaultValue={DEFAULT_PULL_REQUESTS_QUANTITY}
                placeholder={`${DEFAULT_PULL_REQUESTS_QUANTITY}`}
                className="w-16 focus:outline-none h-full bg-transparent text-center text-gray-50"
                id="requests-quantity"
              />
            </div>
          </label>
          <button
            type="submit"
            className="flex items-center justify-center h-9 w-9 rounded-xl self-end
        bg-blue-500 text-gray-900"
          >
            {isLoading ? (
              <FiLoader size={16} className="animate-spin" />
            ) : (
              <FiPlus size={16} />
            )}
          </button>
        </motion.form>
      </OutsideClickHandler>
    </motion.div>
  );
};

export default AddRepositoryModal;
