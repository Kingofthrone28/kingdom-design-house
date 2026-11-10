import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/ChatInterface.module.scss';
import { sendRagChatMessage } from '../utils/index.js';
import { formatResponse, renderFormattedResponse } from '../utils/responseFormatter.js';
import { contactHref } from '../utils/acquisition';
import { sessionRead, sessionWrite, trackAcquisition, trackConfirmedLead, getAttribution } from '../utils/analytics';
import { newSessionId } from '../utils/inquirySession';

const WELCOME = { role: 'assistant', content: "Hello! I’m Jarvis, Kingdom Design House’s AI assistant. Ask about websites, business applications, AI automation, or pricing. If you want a follow-up, share your business project and contact details. Please don’t send patient information, passwords, or other sensitive data. You can also use Contact to reach KDH directly." };
const HISTORY_KEY = 'kdh_chat_history';
const ID_KEY = 'kdh_chat_conversation_id';

export default function ChatInterface({ isOpen, onClose, context = {}, starter = '' }) {
  const [messages, setMessages] = useState([WELCOME]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [pageLoadTime] = useState(Date.now());
  const conversationIdRef = useRef(null);
  const inFlight = useRef(false);
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    conversationIdRef.current = sessionRead(ID_KEY) || newSessionId();
    sessionWrite(ID_KEY, conversationIdRef.current);
    try {
      const saved = JSON.parse(sessionRead(HISTORY_KEY) || 'null');
      if (Array.isArray(saved) && saved.length) {
        const valid = saved.filter(item => ['user', 'assistant'].includes(item?.role) && typeof item.content === 'string').slice(-60);
        if (valid.length) setMessages(valid);
      }
    } catch { /* Use the welcome message when storage is unavailable. */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) sessionWrite(HISTORY_KEY, JSON.stringify(messages.slice(-60)));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, hydrated]);

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const dialog = dialogRef.current;
    dialog.showModal(); // Native modal supplies inert background and keyboard focus containment.
    inputRef.current?.focus();
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { if (dialog.open) dialog.close(); document.body.style.overflow = priorOverflow; };
  }, [isOpen]);

  const sendMessage = async () => {
    const text = inputMessage.trim();
    if (!text || inFlight.current || !hydrated) return;
    inFlight.current = true;
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInputMessage('');
    trackAcquisition('chat_message_sent', context);
    try {
      const result = await sendRagChatMessage(text, messages, {
        conversationId: conversationIdRef.current, website: honeypot, pageLoadTime,
        ...context, ...getAttribution(),
      });
      if (!result.success) throw new Error('Chat unavailable');
      const data = result.data || {};
      const accepted = data.leadCreated === true && data.hubspotLead?.success === true;
      trackConfirmedLead('chat', conversationIdRef.current, accepted, context);
      setMessages(prev => [...prev, {
        role: 'assistant', content: data.response || 'I could not answer that. Please try again or use Contact.',
        leadCreated: accepted,
        leadError: Boolean(data.leadError),
      }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Jarvis is unavailable right now. Please try again or use the Contact link below to send your project inquiry directly.' }]);
    } finally {
      inFlight.current = false;
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  if (!isOpen) return null;
  const fallback = { ...context, cta: 'chat-fallback' };
  return <div className={styles.chatInterface}>
    <dialog ref={dialogRef} className={styles.chatInterface__modal} aria-labelledby="jarvis-title" onCancel={event => { event.preventDefault(); onClose(); }}>
      <div className={styles.chatInterface__header}>
        <div className={styles.chatInterface__title}>
          <Image src="/images/Jarvis.png" alt="" width={40} height={40} />
          <div><h2 id="jarvis-title">Chat with Jarvis</h2><p>Kingdom Design House AI assistant</p></div>
        </div>
        <button className={styles.chatInterface__close} onClick={onClose} aria-label="Close chat">✕</button>
      </div>
      <div className={styles.chatInterface__messages} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions">
        {messages.map((message, index) => <div key={index} className={`${styles.chatInterface__message} ${styles[`chatInterface__message--${message.role === 'user' ? 'user' : 'assistant'}`]}`}>
          <div className={styles.chatInterface__message__content}>
            {message.role === 'assistant' ? renderFormattedResponse(formatResponse(message.content)) : message.content}
          </div>
          {message.leadCreated && <p className={styles.chatInterface__lead__notification}>Your inquiry has been received for follow-up.</p>}
          {message.leadError && <p role="status">Your inquiry could not be saved. Please use Contact below.</p>}
        </div>)}
        {isLoading && <p role="status">Jarvis is responding…</p>}
        <div ref={messagesEndRef} />
      </div>
      {starter && <button type="button" className={styles.starter} onClick={() => { setInputMessage(starter); inputRef.current?.focus(); }}>Start with: {starter}</button>}
      <p className={styles.fallback}><Link href={contactHref(fallback)} onClick={() => { trackAcquisition('service_cta_click', fallback); onClose(); }}>Prefer a person? Send a Contact inquiry</Link></p>
      <form className={styles.chatInterface__input} onSubmit={event => { event.preventDefault(); sendMessage(); }}>
        <input type="text" name="website" value={honeypot} onChange={event => setHoneypot(event.target.value)} hidden tabIndex="-1" autoComplete="off" />
        <textarea ref={inputRef} value={inputMessage} onChange={event => setInputMessage(event.target.value)} onKeyDown={event => {
          if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); sendMessage(); }
        }} aria-label="Message to Jarvis" placeholder="Ask about your business project…" maxLength={4000} rows="2" disabled={isLoading} />
        <button type="submit" disabled={!inputMessage.trim() || isLoading || !hydrated} className={styles.chatInterface__send} aria-label="Send message">Send</button>
      </form>
    </dialog>
  </div>;
}
