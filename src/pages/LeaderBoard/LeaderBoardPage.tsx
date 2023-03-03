import Leaderboard from '../../components/Leaderboard/Leaderboard';
import Tour from '../../components/TourProvider/TourProvider';
import { LeaderBoardSteps } from '../../components/TourProvider/LeaderBoardSteps';
import { CurrentUserApi } from '@codecharacter-2023/client';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import { useAppSelector } from '../../store/hooks';
import { user } from '../../store/User/UserSlice';
import Toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LeaderBoardPage = () => {
  const currentUserApi = new CurrentUserApi(apiConfig);

  const User = useAppSelector(user);
  const navigate = useNavigate();

  const setOpened = (opened: boolean) => {
    if (opened === false) {
      currentUserApi
        .updateCurrentUser({
          name: User.name,
          country: User.country,
          college: User.college,
          updateTutorialLevel: 'NEXT',
        })
        .then(() => {
          navigate('/history');
        })
        .catch(err => {
          if (err instanceof ApiError) Toast.error(err.message);
        });
    }
  };

  return (
    <Tour setOpened={setOpened} steps={LeaderBoardSteps}>
      <Leaderboard />
    </Tour>
  );
};

export default LeaderBoardPage;
