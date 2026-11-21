import '../styles/globals.scss';
import { GDPRProvider } from '../contexts/GDPRContext';
import GDPRCompliance from '../components/GDPRCompliance';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { JarvisProvider } from '../contexts/JarvisContext';

export default function App({ Component, pageProps }) {
  return (
    <GDPRProvider>
      <GoogleAnalytics />
      <JarvisProvider>
        <Component {...pageProps} />
      </JarvisProvider>
      <GDPRCompliance />
    </GDPRProvider>
  );
}
