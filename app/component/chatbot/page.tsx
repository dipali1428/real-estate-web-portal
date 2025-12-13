'use client';
import { useState, useEffect, useRef } from 'react';
import { getCustomResponses } from './customeResponses';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  time: string;
  quickReplies?: { text: string; msg: string }[];
}

interface CustomQuestion {
  keywords: string[];
  response: string;
  category: string;
}

interface CustomResponseConfig {
  questions: CustomQuestion[];
}
export default function Home() {
  return (
    <div className="font-poppins min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
 {/* Chatbot Widget Component */}
      <ChatbotWidget />

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(32, 118, 199, 0.3); }
          50% { box-shadow: 0 0 15px rgba(28, 173, 163, 0.4); }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes typing {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes sendButtonGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(32, 118, 199, 0.4), 0 4px 6px rgba(32, 118, 199, 0.1); }
          50% { box-shadow: 0 0 0 4px rgba(32, 118, 199, 0.2), 0 6px 12px rgba(32, 118, 199, 0.15); }
        }
        
        @keyframes messageBubbleFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-3px) rotate(1deg); }
          66% { transform: translateY(3px) rotate(-1deg); }
        }
        
        @keyframes buttonPress {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient-flow {
          animation: gradientFlow 3s ease infinite;
          background-size: 200% 200%;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.3s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
        
        .animate-typing {
          animation: typing 1.5s infinite;
        }
        
        .animate-send-glow {
          animation: sendButtonGlow 2s infinite;
        }
        
        .animate-message-bubble {
          animation: messageBubbleFloat 6s ease-in-out infinite;
        }
        
        .animate-button-press {
          animation: buttonPress 0.2s ease-out;
        }
        
        .moving-gradient {
          background: linear-gradient(90deg, 
            #2076C7 0%, 
            #1CADA3 25%, 
            #2076C7 50%, 
            #1CADA3 75%, 
            #2076C7 100%
          );
          background-size: 200% 100%;
          animation: gradientFlow 5s linear infinite;
        }
        
        .header-glow {
          position: relative;
          overflow: hidden;
        }
        
        .header-glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: shimmer 3s infinite;
        }
        
        .message-bubble-logo {
          position: relative;
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #2076C7, #1CADA3);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          box-shadow: 0 4px 15px rgba(32, 118, 199, 0.3);
          overflow: hidden;
          transition: all 0.3s ease;
          animation: messageBubbleFloat 6s ease-in-out infinite;
        }
        
        .message-bubble-logo:hover {
          transform: rotate(5deg) scale(1.05);
          box-shadow: 0 6px 20px rgba(32, 118, 199, 0.4);
        }
        
        .message-bubble-logo::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, #2076C7, #1CADA3, #2076C7);
          border-radius: 14px;
          z-index: -1;
          animation: pulse-glow 2s infinite;
        }
        
        .message-icon {
          position: relative;
          width: 24px;
          height: 24px;
          background: white;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .message-lines {
          width: 16px;
          height: 12px;
          position: relative;
        }
        
        .message-line {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, #2076C7, #1CADA3);
          border-radius: 1px;
          left: 0;
        }
        
        .message-line-1 {
          width: 12px;
          top: 0;
        }
        
        .message-line-2 {
          width: 10px;
          top: 4px;
        }
        
        .message-line-3 {
          width: 8px;
          top: 8px;
        }
        
        .send-dot {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          background: #2076C7;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        
        .bubble-ring {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          animation: pulse-ring 2s infinite;
        }
        
        .google-style-response {
          background: linear-gradient(to right, #f8f9fa, #ffffff);
          border-left: 4px solid #1CADA3;
          padding-left: 12px;
          margin: 8px 0;
        }
        
        .financial-tip {
          background: linear-gradient(135deg, #f0f9ff, #e6f7ff);
          border-left: 4px solid #2076C7;
          padding: 10px;
          margin: 8px 0;
          border-radius: 0 8px 8px 0;
        }

        .risk-level {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.75em;
          font-weight: 600;
          display: inline-block;
          margin: 2px;
        }

        .risk-low {
          background: #d1fae5;
          color: #065f46;
        }

        .risk-medium {
          background: #fef3c7;
          color: #92400e;
        }

        .risk-high {
          background: #fee2e2;
          color: #991b1b;
        }
      `}</style>
    </div>
  );
}
// Financial Intelligent Response System - FIXED VERSION
const getFinancialResponse = (userMessage: string): string => {
  const msg = userMessage.toLowerCase().trim();
  // ==== CUSTOM RESPONSES ====
  const customConfig = getCustomResponses();
  for (const question of customConfig.questions) {
    if (question.keywords.some(keyword => msg.includes(keyword))) {
      return question.response;
    }
  }
// ==== DEFAULT RESPONSE ====
  const financialKeywords = [''];
 return `I'm ANITA, your specialized financial assistant. I focus on:\n\n**Core Areas**:\n• Loans & Credit\n• Investments & Wealth Management\n• Insurance & Risk Coverage\n• Financial Planning\n\n**Ask me about Infinity Arthvishva**:\n• "Tell me about Infinity Arthvishva"\n• "What services do you offer?"\n• "Who are the founders/leaders?"\n• "What is your business model?"\n• "Investment opportunities with you"\n• "Your future growth plans"\n\n**Quick Examples**:\n• "Calculate EMI for 30 lakhs"\n• "What is a good credit score?"\n• "Explain mutual funds"\n• "Health insurance plans"\n\nHow can I assist you today?`;
};

// Message Bubble Logo Component
const MessageBubbleLogo = () => {
  return (
    <div className="message-bubble-logo animate-message-bubble">
      <div className="message-icon">
        <div className="message-lines">
          <div className="message-line message-line-1"></div>
          <div className="message-line message-line-2"></div>
          <div className="message-line message-line-3"></div>
        </div>
        <div className="send-dot"></div>
      </div>
      <div className="bubble-ring"></div>
    </div>
  );
};

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [riskProfile, setRiskProfile] = useState('moderate');
  const [investmentHorizon, setInvestmentHorizon] = useState('5-10');
  const [monthlyIncome, setMonthlyIncome] = useState('50000');
  const [financialGoals, setFinancialGoals] = useState<string[]>(['retirement', 'house']);
  const [notifications, setNotifications] = useState(true);

  const handleSaveSettings = () => {
    const settings = {
      riskProfile,
      investmentHorizon,
      monthlyIncome,
      financialGoals,
      notifications,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('financialSettings', JSON.stringify(settings));
    onClose();
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem('financialSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setRiskProfile(settings.riskProfile || 'moderate');
        setInvestmentHorizon(settings.investmentHorizon || '5-10');
        setMonthlyIncome(settings.monthlyIncome || '50000');
        setFinancialGoals(settings.financialGoals || ['retirement', 'house']);
        setNotifications(settings.notifications !== false);
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in-up">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="moving-gradient p-4 text-white relative overflow-hidden header-glow">
          <div className="relative z-10">
            <div className="flex items-center space-x-2">
              <i className="fas fa-user-cog"></i>
              <h3 className="font-bold text-sm">Financial Profile Settings</h3>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Risk Profile:
            </label>
            <select
              value={riskProfile}
              onChange={(e) => setRiskProfile(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2076C7] focus:border-transparent transition-all duration-200"
            >
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Investment Horizon (years):
            </label>
            <select
              value={investmentHorizon}
              onChange={(e) => setInvestmentHorizon(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2076C7] focus:border-transparent transition-all duration-200"
            >
              <option value="1-3">1-3 years (Short Term)</option>
              <option value="3-5">3-5 years (Medium Term)</option>
              <option value="5-10">5-10 years (Long Term)</option>
              <option value="10+">10+ years (Very Long Term)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Monthly Income (₹):
            </label>
            <select
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2076C7] focus:border-transparent transition-all duration-200"
            >
              <option value="25000">₹25,000 - ₹50,000</option>
              <option value="50000">₹50,001 - ₹1,00,000</option>
              <option value="100000">₹1,00,001 - ₹2,00,000</option>
              <option value="200000">Above ₹2,00,000</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Financial Goals:
            </label>
            <div className="space-y-1">
              {['retirement', 'house', 'education', 'car', 'vacation', 'emergency'].map((goal) => (
                <label key={goal} className="flex items-center hover:bg-gray-50 p-1 rounded transition-all duration-200">
                  <input
                    type="checkbox"
                    checked={financialGoals.includes(goal)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFinancialGoals([...financialGoals, goal]);
                      } else {
                        setFinancialGoals(financialGoals.filter(g => g !== goal));
                      }
                    }}
                    className="rounded border-gray-300 text-[#2076C7] focus:ring-[#2076C7] transition-all duration-200"
                  />
                  <span className="ml-2 text-sm capitalize">{goal}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 hover:bg-gray-50 p-2 rounded transition-all duration-200">
            <span className="text-sm text-gray-700">Market Updates</span>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${notifications ? 'bg-[#1CADA3]' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSaveSettings}
              className="flex-1 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-3 py-2 rounded-lg hover:opacity-90 transition-all duration-300 text-sm font-medium hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
            >
              <i className="fas fa-save mr-1"></i>
              Save Profile
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 transition-all duration-300 text-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "👋 Welcome to Infinity Arthvishva! I'm ANITA - Your Automated Navigation and Interface Task Assistant for Loans, Investments & Insurance.\nHow can I assist you today?",
      time: 'Now',
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Check if user is at bottom
  const checkIfAtBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 10;
      setShouldAutoScroll(isAtBottom);
    }
  };

  // Scroll to bottom only if user is at bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current && shouldAutoScroll) {
      const container = messagesContainerRef.current;
      if (container) {
        messagesEndRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'end'
        });
      }
    }
  };

  // When messages change, scroll if at bottom
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  // Auto-scroll to bottom when chat is opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Listen for scroll events to check if user is at bottom
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkIfAtBottom);
      return () => container.removeEventListener('scroll', checkIfAtBottom);
    }
  }, []);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: userInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setShouldAutoScroll(true); // When sending, assume user wants to see new message

    setIsTyping(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: getFinancialResponse(userInput),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickReply = (msg: string) => {
    const newUserMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: msg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setShouldAutoScroll(true);

    setIsTyping(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: getFinancialResponse(msg),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "👋 Welcome back! I'm ANITA, your financial assistant. Ask me about loans, investments, insurance, or Infinity Arthvishva company details.",
        time: 'Now',
      }
    ]);
    setShouldAutoScroll(true);
  };

  return (
    <>
      {/* Enhanced Toggle Button with Message Bubble Logo */}
      <button
  onClick={() => setIsOpen(!isOpen)}
  className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-50 animate-pulse-glow hover:animate-float group"
>
  <div className="relative">
    {/* Animated Message Bubble */}
    <div className="w-10 h-10 relative">
      {/* Main message bubble */}
      <div className="absolute w-8 h-8 bg-white rounded-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:rounded-2xl">
        {/* Message lines */}
        <div className="absolute top-2 left-2 right-2">
          <div className="h-1 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-1.5 w-5 animate-pulse delay-100"></div>
          <div className="h-1 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-1.5 w-4 animate-pulse delay-200"></div>
          <div className="h-1 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full w-3 animate-pulse delay-300"></div>
        </div>
      </div>
      
      {/* Floating dots animation */}
      <div className="absolute -top-1 -right-1">
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce opacity-0 group-hover:opacity-100"></div>
      </div>
      <div className="absolute -bottom-1 -left-1">
        <div className="w-1 h-1 bg-white rounded-full animate-bounce opacity-0 group-hover:opacity-100 delay-150"></div>
      </div>
    </div>
  </div>

  {/* Tooltip */}
  <span className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
    Chat with ANITA
  </span>
</button>

      {/* Medium Size Chatbot Container */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] h-[520px] bg-white rounded-xl shadow-2xl flex flex-col z-40 overflow-hidden border border-gray-300 animate-fade-in-up">
          {/* Professional Header with Message Bubble Logo */}
          <div className="moving-gradient p-3 text-white relative overflow-hidden header-glow">
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center space-x-3">
                <MessageBubbleLogo />
                <div>
                  <h3 className="font-bold text-sm">ANITA</h3>
                  <span className="text-xs opacity-90 font-medium">Automated Navigation and Interface Task Assistant</span>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-300 text-xs backdrop-blur-sm hover:scale-110"
                  title="Settings"
                >
                  <i className="fas fa-user-cog"></i>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-300 text-xs backdrop-blur-sm hover:scale-110"
                  title="Close"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
         {/* Messages Area - WhatsApp style (no auto-scroll) */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 p-3 overflow-y-auto bg-gradient-to-b from-gray-50 to-white"
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-3 ${message.type === 'user' 
                  ? 'justify-end animate-slide-in-right' 
                  : 'justify-start animate-slide-in-left'}`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2076C7] to-[#1CADA3] flex items-center justify-center mr-2 flex-shrink-0 shadow-md">
                    <i className="fas fa-robot text-white text-xs"></i>
                  </div>
                )}

                <div className={`max-w-[75%] ${message.type === 'user' ? 'order-1' : 'order-2'}`}>
                  <div className={`rounded-lg p-2.5 text-sm ${message.type === 'user' 
                    ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-br-none shadow-md' 
                    : 'bg-white border border-gray-200 rounded-bl-none shadow-md google-style-response'}`}>
                    <div className={`${message.type === 'user' ? 'text-white' : 'text-gray-800'}`} style={{ whiteSpace: 'pre-line' }}>
                      {message.content.split('**').map((part, index) =>
                        index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                      )}
                    </div>

                    {message.quickReplies && message.type === 'bot' && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {message.quickReplies.map((reply, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickReply(reply.msg)}
                            className="px-2 py-1 bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 text-[#2076C7] text-xs rounded-lg hover:from-[#2076C7]/20 hover:to-[#1CADA3]/20 transition-all duration-300 border border-[#2076C7]/20"
                          >
                            {reply.text}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className={`text-xs text-gray-500 block mt-0.5 px-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                    {message.time}
                  </span>
                </div>

                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center ml-2 flex-shrink-0 shadow-md">
                    <i className="fas fa-user text-gray-600 text-xs"></i>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2076C7] to-[#1CADA3] flex items-center justify-center mr-2 animate-pulse-glow">
                  <i className="fas fa-robot text-white text-xs"></i>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-2 shadow-md">
                  <div className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-[#1CADA3] rounded-full animate-typing"></span>
                    <span className="w-1.5 h-1.5 bg-[#1CADA3] rounded-full animate-typing delay-150"></span>
                    <span className="w-1.5 h-1.5 bg-[#1CADA3] rounded-full animate-typing delay-300"></span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Analyzing...</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area with Professional Send Button */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex items-center bg-gray-50 rounded-xl p-1.5">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-sm placeholder-gray-400"
              />
              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearChat}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
                  title="Clear Chat"
                >
                  <i className="fas fa-trash-alt text-sm"></i>
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!userInput.trim()}
                  className={`relative px-3.5 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center min-w-[44px] ${
                    userInput.trim()
                      ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white hover:shadow-lg hover:scale-[1.03] active:animate-button-press'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {userInput.trim() && (
                    <span className="absolute -inset-1 bg-gradient-to-r from-[#2076C7]/20 to-[#1CADA3]/20 rounded-xl blur-sm opacity-70 animate-send-glow"></span>
                  )}
                  <span className="relative flex items-center">
                    <i className="fas fa-paper-plane mr-1.5 text-sm"></i>
                    <span className="text-xs font-medium">Send</span>
                  </span>
                </button>
              </div>
            </div>
            <div className="mt-2 flex justify-between items-center px-1"> 
                {userInput.length > 0 && (
                  <button
                    onClick={() => setUserInput('')}
                    className="ml-2 text-xs text-gray-400 hover:text-gray-600"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            </div>
          </div>   
      )}
      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </>
  );
};