import { HistorySteps } from '../../components/TourProvider/HistorySteps';
import Tour from '../../components/TourProvider/TourProvider';
import History from '../../components/CommitHistory/HistoryMain/History';
import { CurrentUserApi } from '@codecharacter-2023/client';
import { useAppSelector } from '../../store/hooks';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import { user } from '../../store/User/UserSlice';
import Toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CommitHistoryPage = () => {
  const currentUserapi = new CurrentUserApi(apiConfig);

  const User = useAppSelector(user);
  const Navigate = useNavigate();

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
          Navigate('/battletv');
        })
        .catch(err => {
          if (err instanceof ApiError) Toast.error(err.message);
        });
    }
  };

  return (
    <Tour setOpened={setOpened} steps={HistorySteps}>
      <History />
    </Tour>
  );
};

export default CommitHistoryPage;
