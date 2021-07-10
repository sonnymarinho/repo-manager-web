import Repository from '../types/Repository';

export const getUniqueRepositories = (
  newRepository: Repository,
  repositories: Repository[],
): Repository[] => {
  const alreadyExists = repositories.find(({ id }) => newRepository.id === id);

  return alreadyExists ? repositories : [...repositories, newRepository];
};
