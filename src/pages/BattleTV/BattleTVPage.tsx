import BattleTV from '../../components/BattleTV/BattleTV';
import { BattleTVSteps } from '../../components/TourProvider/BattleTVSteps';
import Tour from '../../components/TourProvider/TourProvider';

const BattleTVPage = (): JSX.Element => {
  const setOpened = (opened: boolean) => {
    !opened ? console.log('opened') : console.log('closed');
  };

  return (
    <Tour setOpened={setOpened} steps={BattleTVSteps}>
      <BattleTV />
    </Tour>
  );
};

export default BattleTVPage;
