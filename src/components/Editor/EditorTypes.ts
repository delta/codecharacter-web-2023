import { RefObject } from 'react';

export type Props = {
  language: string;
  SaveRef: RefObject<HTMLButtonElement>;
  SubmitRef: RefObject<HTMLButtonElement>;
};
