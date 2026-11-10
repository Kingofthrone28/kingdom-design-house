import { createContext, useContext, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import ChatInterface from '../components/ChatInterface';
import { inquiryContext } from '../utils/acquisition';
import { trackAcquisition, trackOnce } from '../utils/analytics';

const JarvisContext = createContext(null);
export const useJarvis = () => useContext(JarvisContext);

export function JarvisProvider({ children }) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [context, setContext] = useState({});
  const [starter, setStarter] = useState('');
  const openRef = useRef(false);
  const triggerRef = useRef(null);
  const openJarvis = (values = {}, prompt = '') => {
    if (openRef.current) return;
    openRef.current = true;
    triggerRef.current = document.activeElement;
    const clean = inquiryContext({ ...values, sourcePath: values.sourcePath || router.asPath });
    setContext(clean);
    setStarter(prompt);
    setOpen(true);
    trackAcquisition('chat_open', clean);
    if (clean.cta === 'assistant-demo') trackOnce('demo_request_start', 'assistant-demo', clean);
  };
  const closeJarvis = () => {
    openRef.current = false;
    setOpen(false);
    // Focus restoration runs after the dialog stops being modal.
    requestAnimationFrame(() => triggerRef.current?.isConnected && triggerRef.current.focus());
  };
  return <JarvisContext.Provider value={{ openJarvis, closeJarvis, isOpen }}>
    {children}
    <ChatInterface isOpen={isOpen} onClose={closeJarvis} context={context} starter={starter} />
  </JarvisContext.Provider>;
}
