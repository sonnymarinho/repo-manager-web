import { gql } from '@apollo/client';

const DICTIONARY_QUERY = {
  GET_USER_INFO: gql`
    query {
      viewer {
        id
        name
        login
        email
        avatarUrl
      }
    }
  `,
  GET_PULL_REQUESTS_REPOSITORY: gql`
    query getRepository(
      $repositoryName: String!
      $owner: String!
      $lasts: Int!
    ) {
      repository(name: $repositoryName, owner: $owner) {
        pullRequests(last: $lasts) {
          edges {
            node {
              id
              url
              title
              state
              author {
                login
                avatarUrl
                ... on User {
                  name
                  email
                }
              }
            }
          }
        }
      }
    }
  `,
  GET_VALID_REPOSITORY: gql`
    query getValidRepository($repositoryName: String!, $owner: String!) {
      repository(name: $repositoryName, owner: $owner) {
        id
        name
        nameWithOwner
      }
    }
  `,
};

export default DICTIONARY_QUERY;
