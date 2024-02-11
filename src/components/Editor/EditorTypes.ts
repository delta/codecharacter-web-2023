import { RefObject } from 'react';
import { GameType } from '../../store/editor/code';

interface PageType {
  Dashboard: 'Dashboard';
  DailyChallenge: 'DailyChallenge';
  PvP: 'PvP';
  Tutorials: 'Tutorials';
}

export type Props = {
  language: string;
  page: PageType[keyof PageType];
  SaveRef: RefObject<HTMLButtonElement>;
  SubmitRef: RefObject<HTMLButtonElement>;
  gameType: GameType;
  tutorialNumber: number;
};

export type Workspace = {
  filepath: string;
  folderpath: string;
};
