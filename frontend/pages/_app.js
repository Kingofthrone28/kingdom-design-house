import '../styles/globals.scss';
import { GDPRProvider } from '../contexts/GDPRContext';
import GDPRCompliance from '../components/GDPRCompliance';
import GoogleAnalytics from '../components/GoogleAnalytics';

export default function App({ Component, pageProps }) {
  return (
    <GDPRProvider>
      <GoogleAnalytics />
      <Component {...pageProps} />
      <GDPRCompliance />
    </GDPRProvider>
  );
}