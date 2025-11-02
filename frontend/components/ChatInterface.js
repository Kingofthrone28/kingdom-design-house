import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/ChatInterface.module.scss';
import Image from 'next/image';
import { sendRagChatMessage } from '../utils/index.js';
import { formatResponse, renderFormattedResponse } from '../utils/responseFormatter.js';

const ChatInterface = ({ isOpen, onClose }) => {
  const initMessage = {
    role: 'assistant',
    content: `👋 Hello! I'm Jarvis, your AI assistant from Kingdom Design House.

I'm here to help you with:
• 🌐 Web Development & Design (The Web Group)
• 🔧 IT Services & Networking (The Network Group)  
• 🤖 AI Integration & Tools (The AI Group)

What brings you here today? I'd love to learn about your project and how we can help! 

💡 Pro tip: Share your name and email if you'd like a personalized proposal!`
  };
  const [messages, setMessages] = useState([initMessage]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected'); // 'connected', 'slow', 'offline'
  const [honeypot, setHoneypot] = useState(''); // Bot protection honeypot field
  const [pageLoadTime] = useState(Date.now()); // Track page load time for bot detection
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
      // Ensure data exists and has required properties
      if (!data) {
        return {
          role: 'assistant',
          content: 'Sorry, I encountered an error processing your request. Please try again.',
          structuredInfo: null,
          leadCreated: false
        };
      }

      return {
        role: 'assistant',
        content: data.response || 'Sorry, I encountered an error processing your request. Please try again.',
        structuredInfo: data.structuredInfo || null,
        leadCreated: data.leadCreated || false
      };
    }


    try {
      // Use centralized HTTP client with bot protection fields
      const result = await sendRagChatMessage(inputMessage.trim(), messages, {
        website: honeypot, // Honeypot field (should be empty)
        pageLoadTime: pageLoadTime, // For timing validation
      });

      if (result.success) {
        setMessages(prev => [...prev, assistantMessage(result.data)]);
        setConnectionStatus('connected');
      } else {
        // Handle specific error types
        if (result.error?.isTimeout) {
          setConnectionStatus('slow');
          throw new Error('Request timed out. Please try again.');
        } else if (result.error?.isNetworkError) {
          setConnectionStatus('offline');
          throw new Error('Network error. Please check your connection.');
        } else {
          throw new Error(result.error?.message || 'Failed to send message');
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      let errorContent;
      if (error.message.includes('timed out')) {
        errorContent = `⏱️ **Connection Timeout**
        
I'm experiencing slow response times, likely due to network conditions. This is common in public WiFi environments.

**Quick Solutions:**
• Try refreshing the page
• Check your internet connection
• Consider using mobile data if WiFi is slow

I'm still here to help! Please try your message again.`;
      } else if (error.message.includes('Network error')) {
        errorContent = `🌐 **Network Connection Issue**
        
I'm having trouble connecting to my servers. This often happens with:
• Public WiFi restrictions
• Network firewalls
• Temporary connectivity issues

**Please try:**
• Refreshing the page
• Switching to mobile data
• Checking your internet connection

I'll be here when you're ready to continue!`;
      } else {
        errorContent = `Hello! I'm Jarvis from Kingdom Design House. I'm currently experiencing some technical difficulties with my AI services, but I'd be happy to help you with your project needs.

For immediate assistance, please contact us:
📞 Phone: 347.927.8846
📧 Email: info@kingdomdesignhouse.com

We offer comprehensive packages for businesses of all sizes, including:
• Web Development & Design
• IT Services & Support  
• Networking Solutions
• AI Integration

What specific services are you interested in?`;
      }
      
      const errorMessage = {
        role: 'assistant',
        content: errorContent
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
              {connectionStatus === 'slow' && (
                <span className={styles.connectionStatus} style={{color: '#ffa500'}}>
                  ⚠️ Slow connection
                </span>
              )}
              {connectionStatus === 'offline' && (
                <span className={styles.connectionStatus} style={{color: '#ff4444'}}>
                  🔴 Connection issues
                </span>
              )}
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
                {message.role === 'assistant' ? (
                  renderFormattedResponse(formatResponse(message.content || 'No response available'))
                ) : (
                  message.content || 'No message content'
                )}
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
          {/* Honeypot field - hidden from users, bots will fill it */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: 'none' }}
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
          />
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