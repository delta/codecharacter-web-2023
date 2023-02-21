import { RefObject } from 'react';

export type Props = {
  language: string;
  page: 'Dashboard' | 'Dailychallenge';
  SaveRef: RefObject<HTMLButtonElement>;
  SubmitRef: RefObject<HTMLButtonElement>;
};
