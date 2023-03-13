import { CurrentUserApi } from '@codecharacter-2024/client';
import Toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import MapDesigner from '../../components/MapDesigner/MapDesigner';
import { MapDesignerSteps } from '../../components/TourProvider/MapDesignerSteps';
import Tour from '../../components/TourProvider/TourProvider';
import { useAppSelector } from '../../store/hooks';
import { user } from '../../store/User/UserSlice';

const MapDesignerPage = () => {
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
          navigate('/Leaderboard', { replace: true });
        })
        .catch(err => {
          if (err instanceof ApiError) Toast.error(err.message);
        });
    }
  };

  return (
    <Tour setOpened={setOpened} steps={MapDesignerSteps}>
      <MapDesigner pageType={'MapDesigner'} />
    </Tour>
  );
};

export default MapDesignerPage;
