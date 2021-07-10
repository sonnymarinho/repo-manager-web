import React, { useEffect, useState } from 'react';

import { FiGithub } from 'react-icons/fi';
import { HiOutlineLogout, HiOutlineSun } from 'react-icons/hi';
import { useHistory, useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { useMemo } from 'react';
import Author from '../components/Author';
import Table from '../components/Table';
import Repositories from '../components/Repositories';
import { clearToken } from '../utils/auth';
import DICTIONARY_QUERY from '../services/apollo.dictionary.query';
import { client } from '../services/apollo.client';
import Repository from '../types/Repository';

import { getUniqueRepositories } from '../utils/repositories';
import { Author as IAuthor } from '../types/Author';
import { DEFAULT_LAST_PULL_REQUESTS_QUANTITY } from '../config/constants';

const Dashboard: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ user: IAuthor }>();

  const [addRepositoryInputEnable, setAddRepositoryInputEnable] = useState(
    false,
  );

  const [isSearchingAnewRepository, setIsSearchingAnewRepository] = useState(
    false,
  );
  const [repositories, setRepositories] = useState([] as Repository[]);

  const [userInfo, setUserInfo] = useState({} as IAuthor);

  const [getPullRequestsQuery, getPullRequestsState] = useLazyQuery(
    DICTIONARY_QUERY.GET_PULL_REQUESTS_REPOSITORY,
  );

  useEffect(() => {
    const fetch = async () => {
      const locationUserExists = location.state.user;

      if (locationUserExists) {
        setUserInfo(locationUserExists);
        return;
      }

      const { data } = await client.query({
        query: DICTIONARY_QUERY.GET_USER_INFO,
      });

      const fetchedUser = data.viewer;

      setUserInfo(fetchedUser);
    };

    fetch();
  }, []);
  const pullRequests = useMemo(() => {
    const data = getPullRequestsState.data?.viewer?.repository?.pullRequests;

    return data || [];
  }, [getPullRequestsState.data]);

  const handleSignOut = (): void => {
    clearToken();
    history.push('/');
  };

  const searchValidRepository = (repositoryName: string): void => {
    const fetch = async () => {
      const alreadyExists = repositories.find(
        ({ name }) => name === repositoryName,
      );

      if (alreadyExists) {
        toast.dark('Repository already exists');
        return;
      }

      try {
        setIsSearchingAnewRepository(true);
        const { data } = await client.query({
          query: DICTIONARY_QUERY.GET_VALID_REPOSITORY,
          variables: {
            repositoryName,
          },
        });

        const { repository: newRepository } = data.viewer;

        const validRepositories = getUniqueRepositories(
          newRepository,
          repositories,
        );

        setRepositories(validRepositories);

        toast.success('Repository successfully added!');
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsSearchingAnewRepository(false);
      }
    };

    fetch();
  };

  const handleChangeRepository = (name: string) => {
    getPullRequestsQuery({
      variables: {
        repositoryName: name,
        lasts: DEFAULT_LAST_PULL_REQUESTS_QUANTITY,
      },
    });
  };

  return (
    <div
      className="
        flex justify-center
        h-screen bg-gray-900
      "
    >
      <div className="grid grid-rows-dashboard-layout gap-y-20 w-full max-w-7xl h-screen">
        <header className="flex justify-between mt-6">
          <div className="flex items-center justify-center cursor-default">
            <FiGithub className="text-gray-500 text-2xl mr-3" />
            <h1 className="text-gray-500 text-xl">pull request manager</h1>
          </div>

          <div className="flex items-center w-full max-w-xs">
            <Author data={userInfo} />
            <button
              type="button"
              onClick={() => handleSignOut()}
              className="
                h-8 w-8 bg-gray-800 rounded-lg text-gray-400
                flex justify-center items-center flex-shrink-0
                ml-3
              "
            >
              <HiOutlineLogout />
            </button>
            <button
              type="button"
              className="
                h-8 w-8 bg-gray-800 rounded-lg text-gray-400
                flex justify-center items-center flex-shrink-0
                ml-8
              "
            >
              <HiOutlineSun />
            </button>
          </div>
        </header>

        <main
          className="
          grid grid-cols-dashboard gap-8
          pb-28
        "
        >
          <Repositories
            changeRepositoryHandler={handleChangeRepository}
            repositories={repositories}
            setInputEnabled={setAddRepositoryInputEnable}
            isInputEnabled={addRepositoryInputEnable}
            addHandler={searchValidRepository}
            isSearching={isSearchingAnewRepository}
          />
          <Table
            setInputEnabled={setAddRepositoryInputEnable}
            isLoading={getPullRequestsState.loading}
            pullRequests={pullRequests}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
