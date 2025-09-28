import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/ChatInterface.module.scss';
import Image from 'next/image';
import { sendRagChatMessage } from '../utils/index.js';

const ChatInterface = ({ isOpen, onClose }) => {
  const initMessage = {
    role: 'assistant',
    content: 'Hello! I\'m Jarvis, your AI assistant from Kingdom Design House. How can I help you today?'
  };
  const [messages, setMessages] = useState([initMessage]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    const assistantMessage = (data) => {
      return {
        role: 'assistant',
        content: data.response,
        structuredInfo: data.structuredInfo,
        leadCreated: data.leadCreated
      };
    }


    try {
      // Use centralized HTTP client
      const result = await sendRagChatMessage(inputMessage.trim(), messages);

      if (result.success) {
        setMessages(prev => [...prev, assistantMessage(result.data)]);
      } else {
        throw new Error(result.error?.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact us directly at info@kingdomdesignhouse.com'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.chatInterface}>
      <div className={styles.chatInterface__overlay} onClick={onClose}></div>
      <div className={styles.chatInterface__modal}>
        <div className={styles.chatInterface__header}>
          <div className={styles.chatInterface__title}>
            <div className={styles.chatInterface__avatar}>
            <Image src="/images/Jarvis.png" alt="Chat with Jarvis" width={80} height={80} />
            </div>
            <div>
              <h3>Chat with Jarvis</h3>
              <p>AI Assistant</p>
            </div>
          </div>
          <button 
            className={styles.chatInterface__close}
            onClick={onClose}
            aria-label="Close chat"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path 
                d="M15 5L5 15M5 5L15 15" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.chatInterface__messages}>
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`${styles.chatInterface__message} ${
                message.role === 'user' 
                  ? styles['chatInterface__message--user'] 
                  : styles['chatInterface__message--assistant']
              }`}
            >
              <div className={styles.chatInterface__message__content}>
                {message.content}
              </div>
              {message.leadCreated && (
                <div className={styles.chatInterface__lead__notification}>
                  ✅ Lead information saved to our CRM
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className={`${styles.chatInterface__message} ${styles['chatInterface__message--assistant']}`}>
              <div className={styles.chatInterface__typing}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.chatInterface__input}>
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            rows="1"
            disabled={isLoading}
          />
          <button 
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className={styles.chatInterface__send}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path 
                d="M18 2L9 11L18 2ZM9 11L2 8L9 11ZM9 11L18 18L9 11Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;