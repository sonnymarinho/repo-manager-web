import React from 'react';
import { HiOutlineClipboardCopy, HiOutlineExternalLink } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { FiCopy } from 'react-icons/fi';
import Author from './Author';

import emptyState from '../assets/empty-state.svg';
import PullRequests, {
  PullRequest,
  PULL_REQUEST_STATE,
} from '../types/PullRequests';

import { RowSkeleton } from './Skeletons/RowSkeleton';

interface TableProps {
  isLoading: boolean;
  pullRequests: PullRequests;
  handleShowAddNewRepoScreen: () => void;
}

const Table: React.FC<TableProps> = ({
  pullRequests,
  isLoading,
  handleShowAddNewRepoScreen,
}) => {
  const copyAllPullRequestsHandler = async () => {
    const links = pullRequests.edges.map(({ node: { url } }) => url);

    try {
      const parsedLinks = links.join('\n');

      await navigator.clipboard.writeText(parsedLinks);
      toast.info('All pull requests url are copied');
    } catch (err) {
      toast.error('Error at copy repositories link');
    }
  };

  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="flex-shrink-0 h-12 relative mr-6">
        <ul
          className="
              grid grid-flow-col grid-cols-authors-requests
              bg-gray-800 text-gray-500 h-full rounded-xl
              shadow-xl px-8 relative"
        >
          <li className="flex items-center justify-center w-56">Author</li>
          <li className="flex items-center justify-center">Title</li>
          <li className="flex items-center justify-center">Status</li>
          <li className="flex items-center justify-center">Action</li>
          <li className="flex items-center justify-center h-full w-12 border-l-2 border-gray-700 absolute right-0">
            <button
              type="button"
              title="Copy all pull requests link"
              className="hover:bg-blue-500 hover:text-gray-900 p-2 rounded-lg"
              onClick={() => copyAllPullRequestsHandler()}
            >
              <FiCopy size={16} />
            </button>
          </li>
        </ul>
      </div>
      <div className="overflow-y-scroll mt-3 h-full">
        {isLoading &&
          Array.from({ length: 10 }, (_, index) => <RowSkeleton key={index} />)}

        {!isLoading &&
          (!pullRequests.edges || !pullRequests.edges.length ? (
            <div className="flex flex-col h-full w-3/5 mx-auto pt-20">
              <img
                src={emptyState}
                alt="Empty State"
                className="opacity-40 w-48 mx-auto"
              />
              <p className="text-lg text-gray-500 text-center mt-4">
                None pull request was found to be listed. Try to select a new
                one or add a new repository by clicking
                <button
                  type="button"
                  className="hover:text-blue-500 cursor-pointer transition ml-1"
                  onClick={handleShowAddNewRepoScreen}
                >
                  here
                </button>
                .
              </p>
            </div>
          ) : (
            pullRequests.edges.map(({ node: data }) => (
              <Row key={data.id} pullRequest={data} />
            ))
          ))}
      </div>
    </div>
  );
};

interface StateProps {
  type: PULL_REQUEST_STATE;
}

const State: React.FC<StateProps> = ({ type }) => {
  switch (type) {
    case PULL_REQUEST_STATE.OPEN:
      return (
        <span className="bg-green-400 text-gray-900 rounded-md px-2">OPEN</span>
      );

    case PULL_REQUEST_STATE.CLOSED:
      return (
        <span className="bg-red-400 text-gray-900 rounded-md px-2">CLOSED</span>
      );

    case PULL_REQUEST_STATE.MERGED:
      return (
        <span className="bg-purple-400 text-gray-900 rounded-md px-2">
          MERGED
        </span>
      );

    default:
      return (
        <span className="bg-yellow-400 text-gray-900 rounded-md px-2">
          WITHOUT
        </span>
      );
  }
};

interface RowProps {
  pullRequest: PullRequest;
}

const Row: React.FC<RowProps> = ({
  pullRequest: { author, title, state, url },
}) => {
  const handleOpenExternalLink = (link: string) => {
    window.open(link, '_blank');
  };
  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      toast.info('Repository link copied');
    } catch (err) {
      toast.error('Error at copy repository link');
    }
  };
  return (
    <div className="grid grid-flow-col grid-cols-authors-requests rounded-xl bg-gray-800 text-gray-500 mb-2 shadow-xl px-8">
      <div className="p-3 min-w-min">
        <Author data={author} />
      </div>
      <div className="p-3 flex items-center justify-start">{title}</div>
      <div className="p-3 flex items-center justify-center">
        <State type={state} />
      </div>
      <div className="p-3 flex items-center justify-center">
        <button
          type="button"
          className="hover:text-gray-100 mr-2 z-50"
          onClick={() => handleCopyLink(url)}
        >
          <HiOutlineClipboardCopy
            data-tip="copied"
            data-event="click focus"
            className="text-base"
          />
        </button>
        <button
          type="button"
          className="hover:text-gray-100  mx-2"
          onClick={() => handleOpenExternalLink(url)}
        >
          <HiOutlineExternalLink className="text-base" />
        </button>
      </div>
    </div>
  );
};

export default Table;
