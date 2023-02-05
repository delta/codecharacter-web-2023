import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import Register from '../../components/Auth/Auth/Register/Register';
import { SITE_KEY } from '../../config/config';
export default function RegisterForm(): JSX.Element {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={SITE_KEY}>
      <Register />
    </GoogleReCaptchaProvider>
  );
}
