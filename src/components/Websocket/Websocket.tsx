import {
  CurrentUserApi,
  CurrentUserProfile,
  Game,
  GameStatus,
  Notification,
} from '@codecharacter-2023/client';
import { apiConfig } from '../../api/ApiConfig';
import { Stomp } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import Toast from 'react-hot-toast';
import { getLogAction } from '../../store/rendererLogs/logSlice';
import { useAppDispatch } from '../../store/hooks';
import { BASE_PATH } from '../../config/config';
import { changePageState } from '../../store/DailyChallenge/dailyChallenge';

export const Websocket: React.FunctionComponent = () => {
  const currentUserapi = new CurrentUserApi(apiConfig);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<CurrentUserProfile>();

  useEffect(() => {
    if (!user) return;
    const baseUrl = BASE_PATH.replace('http', 'ws');
    const url = `${baseUrl}/ws`;
    const wsClient = Stomp.over(() => new WebSocket(url));
    wsClient.brokerURL = url;
    const handleConnect = () => {
      wsClient.subscribe(`/updates/${user.id}`, message => {
        const game = JSON.parse(message.body) as Game;
        switch (game.status) {
          case GameStatus.Executing:
            Toast.success('Executing now...');
            break;
          case GameStatus.Executed:
            Toast.success('Executed successfully!');
            // TODO: find non-hacky way to do this
            dispatch(changePageState('Dashboard'));
            dispatch(
              getLogAction({
                id: game.id,
                callback: () => (window.location.href = './#/dashboard'),
              }),
            );
            break;
          case GameStatus.ExecuteError:
            Toast.error('Execution error!');
            dispatch(
              getLogAction({
                id: game.id,
                callback: () => (window.location.href = './#/dashboard'),
              }),
            );
            break;
        }
        message.ack();
      });
      wsClient.subscribe(`/notifications/${user.id}`, message => {
        const notification = JSON.parse(message.body) as Notification;
        Toast(() => (
          <div>
            <h3>{notification.title}</h3>
            {notification.content}
          </div>
        ));
        message.ack();
      });
    };

    wsClient.onConnect = handleConnect;
    wsClient.activate();

    return () => {
      wsClient.deactivate();
    };
  }, [user]);

  useEffect(() => {
    if (localStorage.getItem('token') === null) return;
    currentUserapi.getCurrentUser().then(user => {
      setUser(user);
    });
  }, []);
  return <div></div>;
};
