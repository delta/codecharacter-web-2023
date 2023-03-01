import Leaderboard from '../../components/Leaderboard/Leaderboard';
import Tour from '../../components/TourProvider/TourProvider';
import { LeaderBoardSteps } from '../../components/TourProvider/LeaderBoardSteps';

const LeaderBoardPage = () => {
  const setOpened = (opened: boolean) => {
    // dispatch(isTourOpened(opened));
  };

  return (
    <Tour setOpened={setOpened} steps={LeaderBoardSteps}>
      <Leaderboard />
    </Tour>
  );
};

export default LeaderBoardPage;
