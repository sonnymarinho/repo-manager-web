import React from 'react';
import { FiGithub } from 'react-icons/fi';
import { HiOutlineLogin } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { STORAGE_KEY } from '../config/constants';

interface SigninFormData {
  token: string;
}

const Home: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const handleSubmitToken = ({ token }: SigninFormData): void => {
    localStorage.setItem(STORAGE_KEY.TOKEN, token);
    history.push('/dashboard');
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-900">
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
            <HiOutlineLogin className="ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
