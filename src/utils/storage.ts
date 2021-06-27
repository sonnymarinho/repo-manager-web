const { APPLICATION_NAME } = process.env;

export const getStorageSignatureProp = (property: string): string => {
  return `@${APPLICATION_NAME}:${property}`;
};
