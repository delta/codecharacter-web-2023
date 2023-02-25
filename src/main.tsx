import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './main.module.css';
import './global.css';
import { HashRouter, useNavigate } from 'react-router-dom';
import Toast from './components/Toast/Toast';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Loader from './components/Loader/Loader';
import AllRoutes from './AllRoutes';
import Backgroundvideo from './components/Background/BackgroundVideo';
import Tour from './components/TourProvider/TourProvider';
import { SidebarSteps } from './components/TourProvider/SideBarSteps';

const persistor = persistStore(store);
const NavBar = lazy(() => import('./components/NavBar/NavBar'));
const SideBar = lazy(() => import('./components/SideBar/SideBar'));
const EditorSettings = lazy(
  () => import('./components/EditorSettings/EditorSettings'),
);
const SelfMatchModal = lazy(
  () => import('./components/SelfMatchMakingModal/SelfMatchMakeModal'),
);
const EditorInfo = lazy(() => import('./components/EditorInfo/EditorInfo'));
const CommitModal = lazy(() => import('./components/CommitModal/CommitModal'));

const root = createRoot(document.getElementById('root') as Element);

// const Navigate = useNavigate();

const setOpened = (opened: boolean) => {
  if (opened === false) {
    window.location.href = '/#/mapdesigner';
  }
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <Suspense fallback={<Loader />}>
            <EditorSettings />
            <EditorInfo />
            <CommitModal />
            <SelfMatchModal />
            <NavBar />
            <div className={styles.mainWindow}>
              <Tour setOpened={setOpened} steps={SidebarSteps}>
                <SideBar />
              </Tour>
              <div className={styles.gameArea}>
                <Backgroundvideo />
                <AllRoutes />
              </div>
            </div>
          </Suspense>
        </HashRouter>
        <Toast />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
