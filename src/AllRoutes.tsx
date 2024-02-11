import { lazy, useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import Redirect from './components/Redirect/Redirect';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { isloggedIn, loggedIn } from './store/User/UserSlice';

const Home = lazy(() => import('./pages/Home/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const MapDesignerPage = lazy(() => import('./pages/MapDesigner/MapDesigner'));
const CommitHistoryPage = lazy(
  () => import('./pages/CommitHistory/CommitHistoryPage'),
);
const Login = lazy(() => import('./pages/Auth/LoginForm'));
const Register = lazy(() => import('./pages/Auth/RegisterForm'));
const LeaderBoardPage = lazy(
  () => import('./pages/LeaderBoard/LeaderBoardPage'),
);
const BattleTVPage = lazy(() => import('./pages/BattleTV/BattleTVPage'));
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
const Statistics = lazy(() => import('./pages/Statistics/Statistics'));
export default function AllRoutes(): JSX.Element {
  const dispatch = useAppDispatch();
  const logIn = useAppSelector(isloggedIn);

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      dispatch(loggedIn());
    }
  }, []);

  return logIn ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/mapdesigner" element={<MapDesignerPage />} />
      <Route path="/history" element={<CommitHistoryPage />} />
      <Route path="/leaderboard" element={<LeaderBoardPage />} />
      <Route path="/battletv" element={<BattleTVPage />} />
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
