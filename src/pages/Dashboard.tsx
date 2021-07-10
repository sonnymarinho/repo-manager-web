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

import {
  getUniqueRepositories,
  loadRepositoriesFromStorage,
} from '../utils/repositories';
import { Author as IAuthor } from '../types/Author';
import {
  DEFAULT_LAST_PULL_REQUESTS_QUANTITY,
  STORAGE_KEY,
} from '../config/constants';

const Dashboard: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ user: IAuthor }>();

  const [repositoryInputEnabled, setRepositoryInputEnabled] = useState(false);

  const [isSearchingRepository, setIsSearchingRepository] = useState(false);

  const [repositories, setRepositories] = useState([] as Repository[]);

  const [userInfo, setUserInfo] = useState({} as IAuthor);

  const [getPullRequestsQuery, getPullRequestsState] = useLazyQuery(
    DICTIONARY_QUERY.GET_PULL_REQUESTS_REPOSITORY,
  );

  const loadRepositoryPullRequests = (name: string) => {
    getPullRequestsQuery({
      variables: {
        repositoryName: name,
        lasts: DEFAULT_LAST_PULL_REQUESTS_QUANTITY,
      },
    });
  };
  useEffect(() => {
    const getInitialUserInfo = async () => {
      let validUser = null;
      const locationUserExists = location.state.user;

      if (locationUserExists) {
        validUser = locationUserExists;
      } else {
        const { data } = await client.query({
          query: DICTIONARY_QUERY.GET_USER_INFO,
        });

        const fetchedUser = data.viewer;
        validUser = fetchedUser;
      }

      setUserInfo(validUser);

      const storageRepositories = loadRepositoriesFromStorage(validUser);
      setRepositories(storageRepositories);

      if (storageRepositories.length > 0) {
        const { name } = storageRepositories[0];
        loadRepositoryPullRequests(name);
      }
    };

    getInitialUserInfo();
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
        setIsSearchingRepository(true);
        const { data } = await client.query({
          query: DICTIONARY_QUERY.GET_VALID_REPOSITORY,
          variables: {
            repositoryName,
          },
        });

        const { repository: newRepository } = data.viewer;

        if (!newRepository) throw new Error('Repository was not found');

        const validRepositories = getUniqueRepositories(
          newRepository,
          repositories,
        );

        setRepositories(validRepositories);

        localStorage.setItem(
          STORAGE_KEY.REPOSITORIES(userInfo),
          JSON.stringify(validRepositories),
        );

        loadRepositoryPullRequests(repositoryName);

        toast.success('Repository successfully added!');
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsSearchingRepository(false);
      }
    };

    fetch();
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
            changeRepositoryHandler={loadRepositoryPullRequests}
            repositories={repositories}
            setInputEnabled={setRepositoryInputEnabled}
            isInputEnabled={repositoryInputEnabled}
            addHandler={searchValidRepository}
            isSearching={isSearchingRepository}
          />
          <Table
            setInputEnabled={setRepositoryInputEnabled}
            isLoading={getPullRequestsState.loading}
            pullRequests={pullRequests}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
