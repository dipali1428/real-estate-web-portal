'use client';
import { useState, useEffect, useRef } from 'react';
import { getCustomResponses } from './customeResponses';
import { Bot, Send, X, Building2, Briefcase, PhoneCall, MapPin, Handshake } from "lucide-react";

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  time: string;
}

const QUICK_ACTIONS = [
  { label: "About Us", icon: <Building2 size={12} />, query: "Tell me about Infinity Arthvishva" },
  { label: "Our Services", icon: <Briefcase size={12} />, query: "What services do you provide?" },
  { label: "Partner", icon: <Handshake size={12} />, query: "How can I become a partner?" },
  { label: "Contact", icon: <PhoneCall size={12} />, query: "How can I contact the team?" },
  { label: "Location", icon: <MapPin size={12} />, query: "Where is your office located?" }, // Added Location
];

const getFinancialResponse = (userMessage: string): string => {
  try {
    const msg = userMessage.toLowerCase().trim();
    const customConfig = getCustomResponses();
    const match = customConfig.questions.find(q => 
      q.keywords.some(key => new RegExp(`\\b${key}\\b`, 'i').test(msg))
    );
    return match ? match.response : "I'm sorry, I couldn't find specific information regarding that. However, you can contact with this number (1800-532-7600), and our team will get in touch with you to assist you further!";
  } catch (err) {
    return "I'm having a slight connection trouble, but our team will contact you soon.";
  }
};

const AnitaAvatar = ({ size = "md" }: { size?: "sm" | "md" }) => (
  <div className={`relative flex items-center justify-center rounded-full bg-[#1CADA3] shadow-md border-2 border-[#2076C7] ${size === 'sm' ? 'w-8 h-8' : 'w-12 h-12'} animate-message-bubble overflow-hidden`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="12" y="35" width="10" height="20" rx="5" fill="#1CADA3" />
      <rect x="78" y="35" width="10" height="20" rx="5" fill="#1CADA3" />
      <rect x="22" y="15" width="56" height="50" rx="22" fill="white" />
      <rect x="28" y="24" width="44" height="30" rx="14" fill="#1A237E" />
      <path d="M38 38 Q42 32 46 38" stroke="#00E5FF" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M54 38 Q58 32 62 38" stroke="#00E5FF" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M30 60 Q50 90 70 60 L65 85 L35 85 Z" fill="white" />
      <path d="M40 68 Q50 82 60 68" fill="#1CADA3" />
    </svg>
  </div>
);

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'bot', content: "👋 Hi! I'm ANITA, your financial assistance. How can I assist you today?", time: 'Now' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Reference to the chat container and the latest message
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Logic: Scroll to the START (top) of the new message, not the end of the list
  useEffect(() => {
    if (isOpen && lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' // This ensures the view stops at the beginning of the message
        });
    }
  }, [messages, isTyping, isOpen]);

  const processMessage = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { 
      id: Date.now(), 
      type: 'user', 
      content: text, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getFinancialResponse(text);
      const botMsg: Message = { 
        id: Date.now() + 1, 
        type: 'bot', 
        content: botResponse, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleSend = () => {
    processMessage(userInput);
    setUserInput('');
  };

  return (
    <div className="font-poppins">
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-4 right-4 z-50 animate-pulse-glow transition-transform hover:scale-110 active:scale-95 bg-white rounded-full p-0.5"
      >
        <AnitaAvatar />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[330px] sm:w-[350px] h-[520px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200 animate-fade-in-up">
          
          {/* Header */}
          <div className="moving-gradient p-3 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <AnitaAvatar size="sm" />
                <div>
                  <h3 className="font-bold text-xs tracking-tight">ANITA</h3>
                  <p className="text-[9px] opacity-90 font-medium italic">Automated Navigation and Interface Task Assistant.</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-md transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 p-3 overflow-y-auto bg-gray-50 no-scrollbar space-y-4 scroll-smooth"
          >
            {messages.map((m, index) => {
              const isLast = index === messages.length - 1;
              return (
                <div 
                  key={m.id} 
                  ref={isLast ? lastMessageRef : null} // Attach ref only to newest message
                  className={`flex ${m.type === 'user' ? 'justify-end animate-slide-in-right' : 'justify-start animate-slide-in-left'}`}
                >
                  {m.type === 'bot' && (
                    <div className="mt-1 mr-2 scale-75 origin-top-left shrink-0">
                      <AnitaAvatar size="sm" />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-xl p-3 text-[13px] shadow-sm leading-relaxed ${
                    m.type === 'user' 
                    ? 'bg-[#2076C7] text-white rounded-tr-none' 
                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none google-style-response'
                  }`}>
                    <div style={{ whiteSpace: 'pre-line' }}>
                      {m.content.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part)}
                    </div>
                    <p className={`text-[8px] mt-1 opacity-50 ${m.type === 'user' ? 'text-right' : 'text-left'}`}>
                      {m.time}
                    </p>
                  </div>
                </div>
              );
            })}
            
            {isTyping && (
              <div ref={lastMessageRef} className="flex items-center space-x-2 animate-pulse text-gray-400 text-[11px] italic pl-2">
                <Bot size={12}/> Anita is typing...
              </div>
            )}
          </div>

          {/* Footer: Quick Actions + Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            {/* Quick Actions Pills */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {QUICK_ACTIONS.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => processMessage(action.query)}
                  className="flex items-center space-x-1.5 bg-gray-100 hover:bg-[#1CADA3]/10 hover:text-[#1CADA3] border border-gray-100 hover:border-[#1CADA3] text-gray-700 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all"
                >
                  {action.icon}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-1 focus-within:border-[#2076C7] focus-within:bg-white transition-all shadow-inner">
              <input 
                type="text" 
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                placeholder="Ask ANITA anything..." 
                className="flex-1 bg-transparent border-none outline-none py-2 text-xs text-gray-900 placeholder:text-gray-400" 
              />
              <button 
                onClick={handleSend} 
                disabled={!userInput.trim()} 
                className={`p-1.5 rounded-lg transition-all ${userInput.trim() ? 'bg-[#2076C7] text-white shadow-sm' : 'text-gray-300'}`}
              >
                <Send size={14} />
              </button>
            </div>
            <p className="text-[9px] text-center text-gray-400 mt-2 font-medium tracking-wide">Infinity Arthvishva Team</p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes gradientFlow { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 8px rgba(32, 118, 199, 0.3); } 50% { box-shadow: 0 0 18px rgba(28, 173, 163, 0.4); } }
        @keyframes fadeInUp { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideInRight { from { transform: translateX(10px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideInLeft { from { transform: translateX(-10px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        
        .moving-gradient {
          background: linear-gradient(90deg, #2076C7 0%, #1CADA3 25%, #2076C7 50%, #1CADA3 75%, #2076C7 100%);
          background-size: 200% 100%;
          animation: gradientFlow 5s linear infinite;
        }
        .animate-pulse-glow { animation: pulse-glow 2s infinite; }
        .animate-fade-in-up { animation: fadeInUp 0.3s ease-out; }
        .animate-slide-in-right { animation: slideInRight 0.2s ease-out; }
        .animate-slide-in-left { animation: slideInLeft 0.2s ease-out; }
        .google-style-response { border-left: 3px solid #1CADA3; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}