import Leaderboard from '../../components/Leaderboard/Leaderboard';
import Tour from '../../components/TourProvider/TourProvider';
import { LeaderBoardSteps } from '../../components/TourProvider/LeaderBoardSteps';

const LeaderBoardPage = () => {
  const setOpened = (opened: boolean) => {
    !opened ? console.log('opened') : console.log('closed');
  };

  return (
    <Tour setOpened={setOpened} steps={LeaderBoardSteps}>
      <Leaderboard />
    </Tour>
  );
};

export default LeaderBoardPage;
