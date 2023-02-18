import { TourProvider } from '@reactour/tour';
import React from 'react';
import styles from './TourProvider.module.css';

import { steps } from './steps';
import { TourProviderType } from './types';
const Tour: React.FC<TourProviderType> = ({ setOpened, children }) => {
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
          padding: '3% 3% 1% 2%',
          fontSize: '1.25em',
          fontFamily: 'Noto Sans KR',
          '--reactour-accent': 'blue',
          borderRadius: 10,
          background: '#363535',
          borderImage: 'linear-gradient(to left, #743ad5, #d53a9d)',
          color: 'white',
        }),
        close: base => ({
          ...base,
          color: 'red',
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
        }),
        dot: base => ({
          ...base,
          cursor: 'auto',
        }),
        badge: base => ({
          ...base,
          background: 'green',
          color: 'white',
          fontSize: '1.25em',
          fontFamily: 'Noto Sans KR',
          borderRadius: 5,
        }),
      }}
      startAt={0}
      prevButton={({
        Button,
        currentStep,
        stepsLength,
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
                  setOpened(false);
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
        stepsLength,
        setIsOpen,
        setCurrentStep,
        steps,
      }) => {
        return (
          <Button
            kind="next"
            onClick={() => {
              if (steps) {
                if (currentStep === steps.length - 1) return;
                else {
                  setCurrentStep(currentStep + 1);
                }
              }
            }}
          ></Button>
        );
      }}
      onClickMask={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
        setIsOpen(true);
        if (steps) {
          if (currentStep === 5) {
            setOpened(true);
            setTimeout(() => {
              setCurrentStep(6);
            }, 500);
          }
        }
      }}
      onClickClose={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
        if (steps) {
          setIsOpen(false);
          setCurrentStep(s => 0);
        }
      }}
    >
      {children}
    </TourProvider>
  );
};

export default Tour;
