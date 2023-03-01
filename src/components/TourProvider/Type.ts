type STEP = {
  selector: string;
  content: string;
};

export type TourProviderType = {
  setOpened: (val: boolean) => void;
  steps: STEP[];
  children: JSX.Element;
};
