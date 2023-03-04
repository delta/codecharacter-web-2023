import { CurrentUserApi } from '@codecharacter-2023/client';
import Toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import BattleTV from '../../components/BattleTV/BattleTV';
import { BattleTVSteps } from '../../components/TourProvider/BattleTVSteps';
import Tour from '../../components/TourProvider/TourProvider';
import { isTourOverChanged } from '../../store/DailyChallenge/dailyChallenge';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { user } from '../../store/User/UserSlice';

const BattleTVPage = (): JSX.Element => {
  const currentUserApi = new CurrentUserApi(apiConfig);

  const User = useAppSelector(user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
          dispatch(isTourOverChanged(true));
          navigate('/dashboard', { replace: true });
        })
        .catch(err => {
          if (err instanceof ApiError) Toast.error(err.message);
        });
    }
  };

  return (
    <Tour setOpened={setOpened} steps={BattleTVSteps}>
      <BattleTV />
    </Tour>
  );
};

export default BattleTVPage;
