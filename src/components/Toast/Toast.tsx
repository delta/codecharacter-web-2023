import { Toaster } from 'react-hot-toast';
import { Websocket } from '../Websocket/Websocket';

const Toast: React.FunctionComponent = () => {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1a1a1aaa',
            color: '#eaeaea',
            fontFamily: 'Roboto Mono',
            borderRadius: '5px',
          },
        }}
      />
      <Websocket />
    </>
  );
};

export default Toast;
