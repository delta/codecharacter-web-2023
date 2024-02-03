import { RefObject } from 'react';

interface PageType {
  Dashboard: 'Dashboard';
  DailyChallenge: 'DailyChallenge';
  PvP: 'PvP';
}

export type Props = {
  language: string;
  page: PageType[keyof PageType];
  SaveRef: RefObject<HTMLButtonElement>;
  SubmitRef: RefObject<HTMLButtonElement>;
};

export type Workspace = {
  filepath: string;
  folderpath: string;
};
