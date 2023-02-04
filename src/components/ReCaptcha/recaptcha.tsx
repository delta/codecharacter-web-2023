import { default as ReCAPTCHA } from 'react-google-recaptcha';
import { SITE_KEY } from '../../config/config';

interface ReCaptchaProps {
  handleRecaptcha: (value: string | null) => void;
}

export const Recaptcha: React.FC<ReCaptchaProps> = ({
  handleRecaptcha,
}: ReCaptchaProps) => {
  return <ReCAPTCHA sitekey={SITE_KEY} onChange={handleRecaptcha} />;
};
