import { STORAGE_KEY } from '../config/constants';
import { Author } from '../types/Author';
import PrRepository from '../types/PrRepository';

export const getUniqueRepositories = (
  newRepository: PrRepository,
  repositories: PrRepository[],
): PrRepository[] => {
  const alreadyExists = repositories.find(({ id }) => newRepository.id === id);

  return alreadyExists ? repositories : [...repositories, newRepository];
};

export const loadRepositoriesFromStorage = (user: Author): PrRepository[] => {
  const repositoriesInStorage = localStorage.getItem(
    STORAGE_KEY.REPOSITORIES(user),
  );

  if (repositoriesInStorage) {
    const parsedRepositories = JSON.parse(repositoriesInStorage);
    return parsedRepositories as PrRepository[];
  }

  return [] as PrRepository[];
};

export const getLastRepositoryFromStorage = (
  user: Author,
): PrRepository | undefined => {
  const lastRepositoryInStorage = localStorage.getItem(
    STORAGE_KEY.LAST_REPOSITORY(user),
  );

  if (lastRepositoryInStorage) {
    const parsedPrRepository = JSON.parse(lastRepositoryInStorage);
    return parsedPrRepository as PrRepository;
  }

  return undefined;
};

const repository = {
  loadFromStorage: (user: Author) => loadRepositoriesFromStorage(user),
  unique: (newRepository: PrRepository, repositories: PrRepository[]) =>
    getUniqueRepositories(newRepository, repositories),
  loadLastFromStorage: (user: Author) => getLastRepositoryFromStorage(user),
};

export default repository;
