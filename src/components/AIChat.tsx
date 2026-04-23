import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AIChat.css';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hello! I am your AI Election Assistant. Do you have any questions about the voting process or campaigns?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { token } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: userMessage.text })
      });

      if (!res.ok) throw new Error('Failed to fetch response');
      const data = await res.json();
      
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: "Sorry, I'm having trouble connecting to the server right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button 
        className="chat-fab glass-panel"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        style={{ display: isOpen ? 'none' : 'flex' }}
        aria-label="Open AI Assistant"
      >
        <MessageSquare size={24} color="#FF5A1F" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-window glass-panel"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', bounce: 0.4 }}
          >
            <div className="chat-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Bot size={24} color="#FF5A1F" />
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'white', fontFamily: 'Outfit' }}>Election AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="close-btn" aria-label="Close Chat">
                <X size={20} />
              </button>
            </div>

            <div className="chat-messages">
              {messages.map(msg => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`message-bubble-wrapper ${msg.sender}`}
                >
                  {msg.sender === 'ai' && <Bot size={16} className="msg-icon ai" />}
                  <div className={`message-bubble ${msg.sender}`}>
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && <User size={16} className="msg-icon user" />}
                </motion.div>
              ))}
              {isLoading && (
                <div className="message-bubble-wrapper ai">
                  <Bot size={16} className="msg-icon ai" />
                  <div className="message-bubble ai typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="chat-input-area">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the election..."
                disabled={isLoading}
              />
              <button type="submit" disabled={!input.trim() || isLoading} className="send-btn" aria-label="Send Message">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
