import { APPLICATION_NAME } from '../config/constants';

export const getStorageSignatureProp = (property: string): string => {
  return `@${APPLICATION_NAME}:${property}`;
};
