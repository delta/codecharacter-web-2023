import { HistorySteps } from '../../components/TourProvider/HistorySteps';
import Tour from '../../components/TourProvider/TourProvider';
import History from '../../components/CommitHistory/HistoryMain/History';

const CommitHistoryPage = () => {
  const setOpenedHistory = (opened: boolean) => {
    !opened ? console.log('opened') : console.log('closed');
  };

  return (
    <Tour setOpened={setOpenedHistory} steps={HistorySteps}>
      <History />
    </Tour>
  );
};

export default CommitHistoryPage;
