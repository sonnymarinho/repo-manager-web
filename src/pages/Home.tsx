import React, { useState } from 'react';

import { FiGithub, FiLoader } from 'react-icons/fi';
import { HiOutlineLogin } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { setToken } from '../utils/auth';
import { getAuthClient } from '../services/apollo.client';
import DICTIONARY_QUERY from '../services/apollo.dictionary.query';
import { ROUTES } from '../config/constants';

interface SigninFormData {
  token: string;
}

const Home: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitToken = ({ token }: SigninFormData): void => {
    const verifyAndAddToken = async () => {
      const client = getAuthClient(token);
      setIsLoading(true);

      try {
        const query = DICTIONARY_QUERY.GET_USER_INFO;
        const { data } = await client.query({ query });

        setToken(token);

        history.push(ROUTES.DASHBOARD, { user: data.viewer });
      } catch (error) {
        toast.error('Invalid token');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAndAddToken();
  };

  return (
    <motion.div
      initial={{ opacity: 0, top: -50 }}
      animate={{ opacity: 1, top: 'initial' }}
      transition={{ duration: 0.8 }}
      className="flex justify-center items-center w-full h-screen bg-gray-900 absolute"
    >
      <div className="flex-col h-72 w-full max-w-lg">
        <div className="flex items-center justify-center">
          <FiGithub className="text-gray-500 text-2xl mr-3" />
          <h1 className="text-gray-500 text-xl">pull request manager</h1>
        </div>
        <form
          onSubmit={handleSubmit(handleSubmitToken)}
          className="p-6 flex flex-col justify-center items-center bg-gray-800 mt-8 rounded-xl"
        >
          <p className="text-gray-400">
            Please, provide some GitHub token to get access to the app.
          </p>
          <input
            {...register('token')}
            required
            type="text"
            className="
            relative w-full py-2 px-3 mt-4
            text-left bg-white rounded-lg
            shadow-md focus:outline-none
            "
          />
          <button
            type="submit"
            className="
            flex items-center h-10 bg-white text-gray-900 px-4 py-2 rounded-md mt-5
            focus:outline-none
            hover:bg-blue-500 focus:bg-blue-500 hover:text-white focus:text-white
            transition duration-300 ease-in-out
            "
          >
            Submit
            {isLoading ? (
              <FiLoader className="ml-2 animate-spin" />
            ) : (
              <HiOutlineLogin className="ml-2" />
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Home;
