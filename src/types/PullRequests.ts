import { Author } from './Author';

export enum PullRequestState {
  MERGED = 'MERGED',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export default interface PullRequests {
  edges: Array<{
    node: {
      id: string;
      url: string;
      title: string;
      state: PullRequestState;
      author: Author;
    };
  }>;
}
