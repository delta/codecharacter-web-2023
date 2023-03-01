import MapDesigner from '../../components/MapDesigner/MapDesigner';
import { MapDesignerSteps } from '../../components/TourProvider/MapDesignerSteps';
import Tour from '../../components/TourProvider/TourProvider';

const MapDesignerPage = () => {
  const setOpenedMap = (opened: boolean) => {
    // dispatch(isTourOpened(opened));
  };

  return (
    <Tour setOpened={setOpenedMap} steps={MapDesignerSteps}>
      <MapDesigner pageType={'MapDesigner'} />
    </Tour>
  );
};

export default MapDesignerPage;
