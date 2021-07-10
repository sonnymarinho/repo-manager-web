import { STORAGE_KEY } from '../config/constants';
import { Author } from '../types/Author';
import Repository from '../types/Repository';

export const getUniqueRepositories = (
  newRepository: Repository,
  repositories: Repository[],
): Repository[] => {
  const alreadyExists = repositories.find(({ id }) => newRepository.id === id);

  return alreadyExists ? repositories : [...repositories, newRepository];
};

export const loadRepositoriesFromStorage = (user: Author): Repository[] => {
  const repositoriesInStorage = localStorage.getItem(
    STORAGE_KEY.REPOSITORIES(user),
  );

  if (repositoriesInStorage) {
    const parsedRepositories = JSON.parse(repositoriesInStorage);
    return parsedRepositories as Repository[];
  }

  return [] as Repository[];
};
