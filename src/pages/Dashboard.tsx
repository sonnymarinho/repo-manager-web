import React, { useEffect, useState } from 'react';

import { FiGithub } from 'react-icons/fi';
import { HiOutlineLogout, HiOutlineSun } from 'react-icons/hi';
import { useHistory, useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
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
  DEFAULT_PULL_REQUESTS_QUANTITY,
  STORAGE_KEY,
} from '../config/constants';
import AddRepositoryModal from '../components/AddRepositoyModal';
import PullRequests, {
  PullRequest,
  PULL_REQUEST_ORDER,
} from '../types/PullRequests';
import PrRepository from '../types/PrRepository';

const Dashboard: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ user: IAuthor }>();

  const [isAddRepoModalVisible, setIsAddRepoModalVisible] = useState(false);
  const [prRespositories, setPrRepositories] = useState([] as PrRepository[]);
  const [isSearchingANewRepo, setIsSearchingANewRepo] = useState(false);
  const [isSearchingPullRequests, setIsSearchingPullRequests] = useState(false);
  const [userInfo, setUserInfo] = useState({} as IAuthor);
  const [pullRequests, setPullRequests] = useState({} as PullRequests);

  const loadRepositoryPullRequests = (
    repository: Repository,
    order: PULL_REQUEST_ORDER = PULL_REQUEST_ORDER.LAST,
    quantity = DEFAULT_PULL_REQUESTS_QUANTITY,
  ) => {
    const loadPullRequests = async () => {
      const [owner, repositoryName] = repository.nameWithOwner.split('/');

      try {
        setIsSearchingPullRequests(true);
        const { data } = await client.query<{
          repository: { pullRequests: PullRequests };
        }>({
          query: DICTIONARY_QUERY.GET_PULL_REQUESTS_REPOSITORY,
          variables: {
            owner,
            repositoryName,
            lasts: quantity,
          },
        });

        const fetchedPullRequests = data.repository.pullRequests;

        if (!fetchedPullRequests) {
          toast.info('Repository has no pull requests');
          return;
        }

        setPullRequests(fetchedPullRequests);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsSearchingPullRequests(false);
      }
    };

    loadPullRequests();
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

        const fetchedUser = data.data;
        validUser = fetchedUser;
      }

      setUserInfo(validUser);

      const storageRepositories = loadRepositoriesFromStorage(validUser);
      setPrRepositories(storageRepositories);

      if (storageRepositories.length > 0) {
        const storageRepository = storageRepositories[0];
        loadRepositoryPullRequests(storageRepository);
      }
    };

    getInitialUserInfo();
  }, []);

  const handleSignOut = (): void => {
    clearToken();
    history.push('/');
  };

  const addNewRepository = (newFullStateRepository: PrRepository) => {
    const validRepositories = getUniqueRepositories(
      newFullStateRepository,
      prRespositories,
    );

    setPrRepositories(validRepositories);

    localStorage.setItem(
      STORAGE_KEY.REPOSITORIES(userInfo),
      JSON.stringify(validRepositories),
    );

    const { pullRequests: requests, ...repository } = newFullStateRepository;

    loadRepositoryPullRequests(repository, requests.order, requests.quantity);

    toast.success('Repository successfully added!');
  };

  const searchValidRepository = (prRepository: PrRepository): void => {
    const fetch = async () => {
      const alreadyExists = prRespositories.find(
        ({ name }) => name === prRepository.name,
      );

      if (alreadyExists) {
        toast.dark('Repository already exists');
        return;
      }

      const [owner, repositoryName] = prRepository.nameWithOwner.split('/');

      try {
        setIsSearchingANewRepo(true);
        const { data } = await client.query({
          query: DICTIONARY_QUERY.GET_VALID_REPOSITORY,
          variables: {
            repositoryName,
            owner,
          },
        });

        const fetchedRepository = data.repository;

        if (!fetchedRepository) throw new Error('Repository was not found');

        const newFullStateRepository = {
          ...prRepository,
          ...fetchedRepository,
        };

        addNewRepository(newFullStateRepository);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsSearchingANewRepo(false);
        setIsAddRepoModalVisible(false);
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
            repositories={prRespositories}
            handleClickAddRepoButton={() => setIsAddRepoModalVisible(true)}
          />
          <Table
            handleShowAddNewRepoScreen={() => setIsAddRepoModalVisible(true)}
            isLoading={isSearchingPullRequests}
            pullRequests={pullRequests}
          />
        </main>
      </div>
      <AnimatePresence>
        {isAddRepoModalVisible && (
          <AddRepositoryModal
            userInfo={userInfo}
            addNewRepositoryHandler={searchValidRepository}
            setIsOpen={setIsAddRepoModalVisible}
            isLoading={isSearchingANewRepo}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
