import { RefObject } from 'react';

interface PageType {
  Dashboard: 'Dashboard';
  DailyChallenge: 'DailyChallenge';
}

export type Props = {
  language: string;
  page: PageType[keyof PageType];
  SaveRef: RefObject<HTMLButtonElement>;
  SubmitRef: RefObject<HTMLButtonElement>;
};
