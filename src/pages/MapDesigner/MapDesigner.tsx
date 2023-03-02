import MapDesigner from '../../components/MapDesigner/MapDesigner';
import { MapDesignerSteps } from '../../components/TourProvider/MapDesignerSteps';
import Tour from '../../components/TourProvider/TourProvider';

const MapDesignerPage = () => {
  const setOpenedMap = (opened: boolean) => {
    !opened ? console.log('opened') : console.log('closed');
  };

  return (
    <Tour setOpened={setOpenedMap} steps={MapDesignerSteps}>
      <MapDesigner pageType={'MapDesigner'} />
    </Tour>
  );
};

export default MapDesignerPage;
