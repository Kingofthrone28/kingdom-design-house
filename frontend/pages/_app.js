import '../styles/globals.scss';
import { GDPRProvider } from '../contexts/GDPRContext';
import GDPRCompliance from '../components/GDPRCompliance';

export default function App({ Component, pageProps }) {
  return (
    <GDPRProvider>
      <Component {...pageProps} />
      <GDPRCompliance />
    </GDPRProvider>
  );
}