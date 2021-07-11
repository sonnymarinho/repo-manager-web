import { PULL_REQUEST_ORDER } from './PullRequests';
import Repository from './Repository';

export default interface PrRepository extends Repository {
  pullRequests: {
    order: PULL_REQUEST_ORDER;
    quantity: number;
  };
}
