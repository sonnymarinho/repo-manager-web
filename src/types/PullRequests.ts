import { Author } from './Author';

export enum PULL_REQUEST_ORDER {
  LAST = 'last',
  FIRST = 'first',
}

export enum PULL_REQUEST_STATE {
  MERGED = 'MERGED',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface PullRequest {
  id: string;
  url: string;
  title: string;
  state: PULL_REQUEST_STATE;
  author: Author;
}

export default interface PullRequests {
  edges: Array<{
    node: PullRequest;
  }>;
}
