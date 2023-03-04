import SideBar from '../../components/SideBar/SideBar';
import Tour from '../../components/TourProvider/TourProvider';
import { SideBarSteps } from '../../components/TourProvider/SideBarSteps';
import { CurrentUserApi } from '@codecharacter-2023/client';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import { useAppSelector } from '../../store/hooks';
import { user } from '../../store/User/UserSlice';
import Toast from 'react-hot-toast';

const SideBarWrap = () => {
  const currentUserApi = new CurrentUserApi(apiConfig);

  const User = useAppSelector(user);

  const setOpened = (opened: boolean) => {
    if (opened === false) {
      currentUserApi
        .updateCurrentUser({
          name: User.name,
          country: User.country,
          college: User.college,
          updateTutorialLevel: 'SKIP',
        })
        .then(() => {
          Toast.success('Tutorial Completed');
        })
        .catch(err => {
          if (err instanceof ApiError) Toast.error(err.message);
        });
    }
  };

  return (
    <Tour setOpened={setOpened} steps={SideBarSteps}>
      <SideBar />
    </Tour>
  );
};

export default SideBarWrap;
