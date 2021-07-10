import React from 'react';
import { HiOutlineClipboardCopy, HiOutlineExternalLink } from 'react-icons/hi';

import Author from './Author';

import emptyState from '../assets/empty-state.svg';
import PullRequests, { PullRequestState } from '../types/PullRequests';
import { Author as IAuthor } from '../types/Author';

interface TableProps {
  setInputEnabled: (enabled: boolean) => void;
  isLoading: boolean;
  pullRequests: PullRequests;
}

const Table: React.FC<TableProps> = ({ setInputEnabled, pullRequests }) => {
  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="flex-shrink-0 h-12">
        <ul
          className="
              grid grid-flow-col grid-cols-authors-requests
              bg-gray-800 text-gray-500 h-full rounded-xl
              shadow-xl
              mr-6 px-8"
        >
          <li className="flex items-center justify-center w-56">Author</li>
          <li className="flex items-center justify-center">Title</li>
          <li className="flex items-center justify-center">Status</li>
          <li className="flex items-center justify-center">Action</li>
        </ul>
      </div>
      <div className="overflow-y-scroll mt-3 h-full">
        {!pullRequests.edges || !pullRequests.edges.length ? (
          <div className="flex flex-col h-full w-3/5 mx-auto pt-20">
            <img
              src={emptyState}
              alt="Empty State"
              className="opacity-40 w-48 mx-auto"
            />
            <p className="text-lg text-gray-500 text-center mt-4">
              None pull request was found to be listed. Try to select a new one
              or add a new repository by clicking
              <button
                type="button"
                className="hover:text-blue-500 cursor-pointer transition ml-1"
                onClick={() => setInputEnabled(true)}
              >
                here
              </button>
              .
            </p>
          </div>
        ) : (
          pullRequests.edges.map(({ node: data }) => <Row pullRequest={data} />)
        )}
      </div>
    </div>
  );
};

interface StateProps {
  type: PullRequestState;
}

const State: React.FC<StateProps> = ({ type }) => {
  switch (type) {
    case PullRequestState.OPEN:
      return (
        <span className="bg-green-400 text-gray-900 rounded-md px-2">OPEN</span>
      );

    case PullRequestState.CLOSED:
      return (
        <span className="bg-red-400 text-gray-900 rounded-md px-2">CLOSED</span>
      );

    case PullRequestState.MERGED:
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
  pullRequest: {
    id: string;
    url: string;
    title: string;
    state: PullRequestState;
    author: IAuthor;
  };
}

const Row: React.FC<RowProps> = ({ pullRequest: { author, title, state } }) => {
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
        <button type="button" className="hover:text-gray-100 mr-2">
          <HiOutlineClipboardCopy className="text-base" />
        </button>
        <button type="button" className="hover:text-gray-100  mx-2">
          <HiOutlineExternalLink className="text-base" />
        </button>
      </div>
    </div>
  );
};

export default Table;
