import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './main.module.css';
import './global.css';
import { HashRouter } from 'react-router-dom';
import Toast from './components/Toast/Toast';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Loader from './components/Loader/Loader';
import AllRoutes from './AllRoutes';
import Backgroundvideo from './components/Background/BackgroundVideo';

const persistor = persistStore(store);
const NavBar = lazy(() => import('./components/NavBar/NavBar'));
const SideBarWrap = lazy(() => import('./pages/SideBarWrap/SideBarWrap'));
const EditorSettings = lazy(
  () => import('./components/EditorSettings/EditorSettings'),
);
const SelfMatchModal = lazy(
  () => import('./components/SelfMatchMakingModal/SelfMatchMakeModal'),
);
const PvPSelfMatchModal = lazy(
  () => import('./components/PvPSelfMatchMakingModal/PvPSelfMatchMakeModal'),
);
const EditorInfo = lazy(() => import('./components/EditorInfo/EditorInfo'));
const CommitModal = lazy(() => import('./components/CommitModal/CommitModal'));

const root = createRoot(document.getElementById('root') as Element);

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
            <PvPSelfMatchModal />
            <NavBar />
            <div className={styles.mainWindow}>
              <SideBarWrap />
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
