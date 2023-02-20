import { lazy, useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import Redirect from './components/Redirect/Redirect';
import { HistorySteps } from './components/TourProvider/HistorySteps';
import { MapDesignerSteps } from './components/TourProvider/MapDesignerSteps';
import Tour from './components/TourProvider/TourProvider';
import { isTourOpened } from './store/EditorSettings/settings';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { isloggedIn, loggedIn } from './store/User/UserSlice';

const Home = lazy(() => import('./pages/Home/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const MapDesigner = lazy(() => import('./components/MapDesigner/MapDesigner'));
const History = lazy(
  () => import('./components/CommitHistory/HistoryMain/History'),
);
const Login = lazy(() => import('./pages/Auth/LoginForm'));
const Register = lazy(() => import('./pages/Auth/RegisterForm'));
const Leaderboard = lazy(() => import('./components/Leaderboard/Leaderboard'));
const BattleTV = lazy(() => import('./components/BattleTV/BattleTV'));
const Verify = lazy(
  () => import('./components/Auth/Auth/Register/ActivateUser/ActivateUser'),
);
const ResetPassword = lazy(
  () =>
    import(
      './components/Auth/Auth/Login/ForgetPassword/ResetpasswordVerifcation'
    ),
);
const IncompleteProfile = lazy(
  () =>
    import('./components/Auth/Auth/Login/IncompleteProfile/incompeleteProfile'),
);
const Profile = lazy(() => import('./components/Profile/Profile'));

export default function AllRoutes(): JSX.Element {
  const dispatch = useAppDispatch();
  const logIn = useAppSelector(isloggedIn);

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      dispatch(loggedIn());
    }
  }, []);

  const setOpenedMap = (opened: boolean) => {
    dispatch(isTourOpened(opened));
  };

  const setOpenedHistory = (opened: boolean) => {
    dispatch(isTourOpened(opened));
  };

  return logIn ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/mapdesigner"
        element={
          <Tour setOpened={setOpenedMap} steps={MapDesignerSteps}>
            <MapDesigner />
          </Tour>
        }
      />
      <Route
        path="/history"
        element={
          <Tour setOpened={setOpenedHistory} steps={HistorySteps}>
            <History />
          </Tour>
        }
      />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/battletv" element={<BattleTV />} />
      <Route path="/activate" element={<Verify />} />
      <Route path="/incomplete-profile" element={<IncompleteProfile />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Redirect />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/activate" element={<Verify />} />
      <Route path="/incomplete-profile" element={<IncompleteProfile />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Redirect />} />
    </Routes>
  );
}
