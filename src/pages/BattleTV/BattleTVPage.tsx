import { CurrentUserApi } from '@codecharacter-2023/client';
import Toast from 'react-hot-toast';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import BattleTV from '../../components/BattleTV/BattleTV';
import { BattleTVSteps } from '../../components/TourProvider/BattleTVSteps';
import Tour from '../../components/TourProvider/TourProvider';
import { useAppSelector } from '../../store/hooks';
import { user } from '../../store/User/UserSlice';

const BattleTVPage = (): JSX.Element => {
  const currentUserapi = new CurrentUserApi(apiConfig);

  const User = useAppSelector(user);

  const setOpened = (opened: boolean) => {
    if (opened === false) {
      currentUserapi
        .updateCurrentUser({
          name: User.name,
          country: User.country,
          college: User.college,
          updateTutorialLevel: 'NEXT',
        })
        .then(() => {
          console.log('Tutorial level updated');
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
