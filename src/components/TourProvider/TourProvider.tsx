import { TourProvider } from '@reactour/tour';
import React from 'react';
import styles from './TourProvider.module.css';
import { TourProviderType } from './Type';

const Tour: React.FC<TourProviderType> = ({ setOpened, children, steps }) => {
  return (
    <TourProvider
      disableInteraction={true}
      steps={steps}
      maskClassName={styles.mask}
      highlightedMaskClassName={styles.highlightedMask}
      // disableKeyboardNavigation={false}
      // disableDotsNavigation={false}
      styles={{
        popover: base => ({
          ...base,
          padding: '2% 2% 1% 2%',
          fontSize: '1.25em',
          fontFamily: 'Roboto',
          '--reactour-accent': 'blue',
          borderRadius: 10,
          background: '#363535',
          borderImage: 'linear-gradient(to right, #92fe9d 0%, #00c9ff 100%)',
          color: 'white',
        }),
        close: base => ({
          ...base,
          color: 'gray',
          marginTop: '',
          transform: 'scale(1.5)',
          background: '#303030',
        }),
        maskArea: base => ({
          ...base,
          rx: 10,
        }),
        arrow: base => ({
          ...base,
          color: 'white',
          transform: 'scale(1.3)',
        }),
        dot: base => ({
          ...base,
          cursor: 'auto',
          border: '1px solid gray',
          background:
            'radial-gradient(759px at 14% 22.3%, rgb(10, 94, 68) 0%, rgb(15, 164, 102) 90%)',
        }),
        badge: base => ({
          ...base,
          background:
            'radial-gradient(759px at 14% 22.3%, rgb(10, 94, 68) 0%, rgb(15, 164, 102) 90%)',
          color: 'white',
          fontSize: '1.25em',
          fontFamily: 'Noto Sans KR',
          borderRadius: 100,
        }),
      }}
      startAt={0}
      prevButton={({
        Button,
        currentStep,
        setIsOpen,
        setCurrentStep,
        steps,
      }) => {
        return (
          <div className={styles.Btn}>
            <Button
              onClick={() => {
                if (currentStep == 0) return;
                if (currentStep === steps?.length) {
                  setIsOpen(false);
                }
                setCurrentStep(currentStep - 1);
              }}
              kind="prev"
            ></Button>
          </div>
        );
      }}
      nextButton={({
        Button,
        currentStep,
        setIsOpen,
        setCurrentStep,
        steps,
      }) => {
        return (
          <Button
            kind="next"
            onClick={() => {
              if (steps) {
                if (currentStep + 1 === steps?.length) {
                  setIsOpen(false);
                  setOpened(false);
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }
            }}
          ></Button>
        );
      }}
      onClickMask={({ setIsOpen }) => {
        setIsOpen(true);
      }}
      onClickClose={({ setIsOpen }) => {
        setOpened(false);
        setIsOpen(false);
      }}
      position={'right'}
    >
      {children}
    </TourProvider>
  );
};

export default Tour;
