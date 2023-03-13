import SideBar from '../../components/SideBar/SideBar';
import Tour from '../../components/TourProvider/TourProvider';
import { SideBarSteps } from '../../components/TourProvider/SideBarSteps';
import { CurrentUserApi } from '@codecharacter-2024/client';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import Toast from 'react-hot-toast';

const SideBarWrap = () => {
  const currentUserApi = new CurrentUserApi(apiConfig);

  const setOpened = (opened: boolean) => {
    if (opened === false) {
      currentUserApi
        .updateCurrentUser({
          updateTutorialLevel: 'NEXT',
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
